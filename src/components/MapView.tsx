"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Building,
  Car,
  ClipboardList,
  GraduationCap,
  Hammer,
  HeartPulse,
  Landmark,
  Store,
  Users,
  Wrench,
  X,
  type LucideIcon,
} from "lucide-react";
import { MAP_PINS, type MapPin, type MapPinType } from "@/lib/mapPins";
import { useLanguage } from "@/lib/i18n";
import { translations } from "@/lib/translations";

const MAP_WIDTH = 1543;
const MAP_HEIGHT = 1019;
// The source map image is landscape; it's rotated 90deg counter-clockwise so
// it fills a portrait phone screen. The stage below uses the swapped (portrait) size.
const STAGE_WIDTH = MAP_HEIGHT;
const STAGE_HEIGHT = MAP_WIDTH;
const MIN_ZOOM = 1;
const MAX_ZOOM = 4;
// Even when the map exactly fits the viewport on an axis, allow this many
// px of play around the resting position so it's clear the map can be panned.
const PAN_SLACK = 28;
// How far past the fit-to-screen scale the user must zoom in before a zone
// pin (ชมรม / องค์กร / อาคารคณะ) splits into one pin per booth.
const SUB_PIN_REVEAL_RATIO = 2.2;
// Constant on-screen size (px) for pin markers, regardless of zoom.
const MARKER_SIZE = 36;

function rotatePinPercent(pin: { x: number; y: number }) {
  return { x: pin.y, y: 100 - pin.x };
}

const PIN_STYLE: Record<MapPinType, { icon: LucideIcon; className: string }> = {
  faculty: { icon: GraduationCap, className: "bg-[#4C6B3C] text-white" },
  club: { icon: Users, className: "bg-primary text-white" },
  shop: { icon: Store, className: "bg-[#D9A441] text-white" },
  facility: { icon: Wrench, className: "bg-[#5A6B8C] text-white" },
  landmark: { icon: Landmark, className: "bg-[#8C4C6B] text-white" },
  service: { icon: HeartPulse, className: "bg-[#C24A4A] text-white" },
  parking: { icon: Car, className: "bg-[#5A6B8C] text-white" },
  registration: { icon: ClipboardList, className: "bg-[#2F7A8C] text-white" },
  workshop: { icon: Hammer, className: "bg-[#C1652E] text-white" },
  organization: { icon: Users, className: "bg-[#5B4B9E] text-white" },
  building: { icon: Building, className: "bg-[#6B7280] text-white" },
};

type Transform = { scale: number; x: number; y: number };

function clampTransform(t: Transform, viewportW: number, viewportH: number): Transform {
  const scale = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM * fitScale(viewportW, viewportH), t.scale));
  const contentW = STAGE_WIDTH * scale;
  const contentH = STAGE_HEIGHT * scale;

  let x = t.x;
  let y = t.y;

  if (contentW <= viewportW) {
    const center = (viewportW - contentW) / 2;
    x = Math.min(center + PAN_SLACK, Math.max(center - PAN_SLACK, x));
  } else {
    x = Math.min(0, Math.max(viewportW - contentW, x));
  }

  if (contentH <= viewportH) {
    const center = (viewportH - contentH) / 2;
    y = Math.min(center + PAN_SLACK, Math.max(center - PAN_SLACK, y));
  } else {
    y = Math.min(0, Math.max(viewportH - contentH, y));
  }

  return { scale, x, y };
}

// Slightly under-fit so the map has a small margin instead of touching the
// viewport edges exactly.
const FIT_MARGIN_RATIO = 0.9;

function fitScale(viewportW: number, viewportH: number): number {
  return Math.min(viewportW / STAGE_WIDTH, viewportH / STAGE_HEIGHT) * FIT_MARGIN_RATIO;
}

export default function MapView() {
  const router = useRouter();
  const { language } = useLanguage();
  const t = translations[language].map;
  const viewportRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState<Transform>({ scale: 1, x: 0, y: 0 });
  const [selectedPin, setSelectedPin] = useState<MapPin | null>(null);
  const [sheetVisible, setSheetVisible] = useState(false);
  const [baseScale, setBaseScale] = useState(1);
  const baseScaleRef = useRef(1);

  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const dragState = useRef<{ startX: number; startY: number; lastFlushX: number; lastFlushY: number; moved: boolean } | null>(null);
  const pinchState = useRef<{ distance: number; scale: number } | null>(null);
  const rafHandle = useRef<number | null>(null);

  const fitToViewport = useCallback(() => {
    const el = viewportRef.current;
    if (!el) return;
    const { width, height } = el.getBoundingClientRect();
    const scale = fitScale(width, height);
    baseScaleRef.current = scale;
    setBaseScale(scale);
    setTransform(
      clampTransform(
        { scale, x: (width - STAGE_WIDTH * scale) / 2, y: 0 },
        width,
        height,
      ),
    );
  }, []);

  useEffect(() => {
    fitToViewport();
    const el = viewportRef.current;
    if (!el) return;
    const observer = new ResizeObserver(fitToViewport);
    observer.observe(el);
    return () => observer.disconnect();
  }, [fitToViewport]);

  const zoomAt = useCallback((clientX: number, clientY: number, factor: number) => {
    const el = viewportRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = clientX - rect.left;
    const py = clientY - rect.top;

    setTransform((prev) => {
      const nextScale = Math.min(MAX_ZOOM, Math.max(baseScaleRef.current, prev.scale * factor));
      const ratio = nextScale / prev.scale;
      const x = px - (px - prev.x) * ratio;
      const y = py - (py - prev.y) * ratio;
      return clampTransform({ scale: nextScale, x, y }, rect.width, rect.height);
    });
  }, []);

  const onWheel = useCallback(
    (e: WheelEvent) => {
      e.preventDefault();
      const factor = Math.exp(-e.deltaY * 0.0015);
      zoomAt(e.clientX, e.clientY, factor);
    },
    [zoomAt],
  );

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    // React's synthetic onWheel listener is passive, so preventDefault() there
    // is silently ignored; a native listener is required to stop page zoom/scroll.
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [onWheel]);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    (e.target as Element).setPointerCapture(e.pointerId);
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (pointers.current.size === 1) {
      dragState.current = {
        startX: e.clientX,
        startY: e.clientY,
        lastFlushX: e.clientX,
        lastFlushY: e.clientY,
        moved: false,
      };
    } else if (pointers.current.size === 2) {
      const pts = Array.from(pointers.current.values());
      const distance = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
      pinchState.current = { distance, scale: transform.scale };
      dragState.current = null;
    }
  }, [transform.scale]);

  // Runs at most once per animation frame regardless of how many raw touch
  // samples fire in between — on iOS those can arrive fast enough to
  // overwhelm the main thread with a full re-render each time, which can
  // crash the tab ("This page couldn't load") during pinch/pan.
  const flushPointerMove = useCallback(() => {
    rafHandle.current = null;
    const el = viewportRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();

    if (pointers.current.size === 2 && pinchState.current) {
      const pts = Array.from(pointers.current.values());
      const distance = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
      const midX = (pts[0].x + pts[1].x) / 2;
      const midY = (pts[0].y + pts[1].y) / 2;
      const factor = distance / pinchState.current.distance;

      setTransform((prev) => {
        const nextScale = Math.min(
          MAX_ZOOM,
          Math.max(baseScaleRef.current, pinchState.current!.scale * factor),
        );
        const px = midX - rect.left;
        const py = midY - rect.top;
        const ratio = nextScale / prev.scale;
        const x = px - (px - prev.x) * ratio;
        const y = py - (py - prev.y) * ratio;
        return clampTransform({ scale: nextScale, x, y }, rect.width, rect.height);
      });
      return;
    }

    if (pointers.current.size === 1 && dragState.current) {
      const [pt] = Array.from(pointers.current.values());
      const dx = pt.x - dragState.current.lastFlushX;
      const dy = pt.y - dragState.current.lastFlushY;
      dragState.current.lastFlushX = pt.x;
      dragState.current.lastFlushY = pt.y;
      if (dx === 0 && dy === 0) return;

      setTransform((prev) =>
        clampTransform({ ...prev, x: prev.x + dx, y: prev.y + dy }, rect.width, rect.height),
      );
    }
  }, []);

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!pointers.current.has(e.pointerId)) return;
      pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

      if (dragState.current && !dragState.current.moved) {
        const dx = e.clientX - dragState.current.startX;
        const dy = e.clientY - dragState.current.startY;
        if (Math.abs(dx) > 3 || Math.abs(dy) > 3) dragState.current.moved = true;
      }

      if (rafHandle.current == null) {
        rafHandle.current = requestAnimationFrame(flushPointerMove);
      }
    },
    [flushPointerMove],
  );

  const endPointer = useCallback((e: React.PointerEvent) => {
    pointers.current.delete(e.pointerId);
    if (pointers.current.size < 2) pinchState.current = null;
    if (pointers.current.size === 0) {
      dragState.current = null;
      if (rafHandle.current != null) {
        cancelAnimationFrame(rafHandle.current);
        rafHandle.current = null;
      }
    }
  }, []);

  useEffect(() => {
    return () => {
      if (rafHandle.current != null) cancelAnimationFrame(rafHandle.current);
    };
  }, []);

  const handlePinClick = (pin: MapPin, e: React.MouseEvent) => {
    if (dragState.current?.moved) return;
    e.stopPropagation();
    setSelectedPin(pin);
    requestAnimationFrame(() => setSheetVisible(true));
  };

  const closeSheet = () => {
    setSheetVisible(false);
    setTimeout(() => setSelectedPin(null), 200);
  };

  const pinStyle = selectedPin ? PIN_STYLE[selectedPin.type] : null;
  const PinIcon = pinStyle?.icon;

  return (
    <div className="relative w-full" style={{ height: "calc(100dvh - 64px)" }}>
      <div
        ref={viewportRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endPointer}
        onPointerCancel={endPointer}
        onPointerLeave={endPointer}
        className="relative h-full w-full touch-none overflow-hidden bg-[#E7E7E7]"
      >
        <div
          className="absolute top-0 left-0 origin-top-left"
          style={{
            width: STAGE_WIDTH,
            height: STAGE_HEIGHT,
            transform: `translate3d(${transform.x}px, ${transform.y}px, 0) scale(${transform.scale})`,
          }}
        >
          <div
            className="absolute top-0 left-0"
            style={{
              width: MAP_WIDTH,
              height: MAP_HEIGHT,
              transformOrigin: "0 0",
              transform: `matrix(0, -1, 1, 0, 0, ${MAP_WIDTH})`,
            }}
          >
            <Image
              src="/firstdate_map.png"
              alt="แผนที่งาน"
              width={MAP_WIDTH}
              height={MAP_HEIGHT}
              priority
              draggable={false}
              className="pointer-events-none block w-full h-full select-none"
            />
          </div>

          {MAP_PINS.flatMap((pin) => {
            const style = PIN_STYLE[pin.type];
            const Icon = style.icon;
            const showSubPins =
              !!pin.subPins && transform.scale / baseScale >= SUB_PIN_REVEAL_RATIO;
            const subTargets = pin.subPins
              ? pin.subPins.map((sub, index) => ({
                  key: `${pin.id}-${index}`,
                  pin: { ...pin, ...sub },
                  visible: showSubPins,
                }))
              : [];
            const targets = subTargets.concat([
              { key: `${pin.id}`, pin, visible: !pin.subPins || !showSubPins },
            ]);

            return targets.map(({ key, pin: target, visible }) => {
              const { x, y } = rotatePinPercent(target);
              // The button's width/height are set in un-scaled stage px so that,
              // once the ancestor stage's scale(transform.scale) is applied, it
              // renders (and hit-tests) at a constant MARKER_SIZE on screen —
              // sizing this way keeps the clickable area exactly matching what's
              // drawn, unlike countering the zoom with a `transform: scale()` on
              // the button itself (browsers don't reliably shrink the hit box to
              // match a transformed element's rendered size in that setup).
              const markerBoxSize = MARKER_SIZE / transform.scale;
              // Icon/label are drawn in the same un-scaled stage space as the
              // button, so they need the same counter-scaling — otherwise they'd
              // render at a fixed CSS size and end up tiny when zoomed out or
              // oversized when zoomed in, instead of matching the marker's
              // constant on-screen size.
              const iconSize = (markerBoxSize * 18) / MARKER_SIZE;
              const labelFontSize = (markerBoxSize * 12) / MARKER_SIZE;
              const borderWidth = (markerBoxSize * 2) / MARKER_SIZE;
              return (
                <div
                  key={key}
                  className={`absolute -translate-x-1/2 -translate-y-full transition-opacity duration-200 ${
                    visible ? "opacity-100" : "pointer-events-none opacity-0"
                  }`}
                  style={{ left: `${x}%`, top: `${y}%` }}
                >
                  <button
                    type="button"
                    onClick={(e) => handlePinClick(target, e)}
                    tabIndex={visible ? 0 : -1}
                    aria-hidden={!visible}
                    className={`block drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)] ${
                      visible ? "cursor-pointer" : "pointer-events-none"
                    }`}
                    style={{ width: markerBoxSize, height: markerBoxSize }}
                  >
                    <span
                      className={`flex h-full w-full items-center justify-center rounded-full border-white ${style.className}`}
                      style={{ borderWidth, borderStyle: "solid" }}
                    >
                      {target.label ? (
                        <span className="font-bold" style={{ fontSize: labelFontSize }}>
                          {target.label}
                        </span>
                      ) : (
                        <Icon size={iconSize} strokeWidth={2.25} />
                      )}
                    </span>
                  </button>
                </div>
              );
            });
          })}
        </div>
      </div>

      {selectedPin && pinStyle && PinIcon && (
        <div
          onClick={closeSheet}
          className={`fixed inset-0 z-60 flex items-end bg-black/40 transition-opacity duration-200 ${
            sheetVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`w-full max-w-[768px] rounded-t-3xl bg-background p-6 pb-6 shadow-[0_0_32px_var(--color-shadow-black)] transition-transform duration-200 mx-auto ${
              sheetVisible ? "translate-y-0" : "translate-y-full"
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                {selectedPin.logoSrc ? (
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white">
                    <Image
                      src={selectedPin.logoSrc}
                      alt={selectedPin.name}
                      width={44}
                      height={44}
                      className="object-cover"
                    />
                  </span>
                ) : (
                  <span
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${pinStyle.className}`}
                  >
                    <PinIcon size={20} />
                  </span>
                )}
                <div>
                  <p className="text-xs font-medium text-stone">
                    {t.pinType[selectedPin.type]}
                  </p>
                  <h2 className="font-heading text-lg font-semibold text-foreground">
                    {selectedPin.name}
                  </h2>
                </div>
              </div>
              <button
                type="button"
                onClick={closeSheet}
                aria-label={t.close}
                className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full bg-surface text-foreground"
              >
                <X size={18} />
              </button>
            </div>

            <p className="mt-4 leading-relaxed text-charcoal">
              {selectedPin.description}
            </p>

            {selectedPin.link && (
              <button
                type="button"
                onClick={() => router.push(selectedPin.link!)}
                className="mt-5 flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-medium text-white"
              >
                {selectedPin.linkLabel ?? t.viewAllClubs}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
