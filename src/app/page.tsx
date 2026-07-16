import { Rose } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="pointer-events-none fixed inset-0 -z-10 h-screen w-screen overflow-hidden">
        <Image
          src="/firstdate_bg.png"
          alt=""
          fill
          priority
          className="object-cover object-center blur-[1px]"
        />

        <div className="absolute top-10 -left-22 z-300">
          <Image
            src="/locket_cu110.png"
            alt=""
            width={1920}
            height={1080}
            className="h-auto w-[80vw] max-w-[460px]"
          />
        </div>
        <div className="absolute z-80 top-5 -right-25">
          <Image
            src="/flowers_tr.png"
            alt=""
            width={1920}
            height={1080}
            className="h-auto w-[86vw] max-w-[600px]"
          />
        </div>
        <div className="absolute -bottom-10 -left-31 z-300">
          <Image
            src="/key.png"
            alt=""
            width={1920}
            height={1080}
            className="h-auto w-[100vw] max-w-[590px]"
          />
        </div>

        <div className="absolute bottom-1 -right-30 md:-right-40 z-300">
          <Image
            src="/unlocked_your_fate.png"
            alt=""
            width={1920}
            height={1080}
            className="h-auto w-[80vw] max-w-[500px]"
          />
        </div>
        <div className="absolute bottom-5 -left-20 z-80">
          <Image
            src="/flowers_bl.png"
            alt=""
            width={1920}
            height={1080}
            className="h-auto w-[90vw] max-w-[600px]"
          />
        </div>
        <div className="absolute bottom-5 md:bottom-0 right-0 z-70">
          <Image
            src="/chula.png"
            alt=""
            width={1920}
            height={1080}
            className="h-auto w-[72vw] max-w-[530px]"
          />
        </div>
        <div
          className="absolute -bottom-10 left-0 z-100 h-56 w-full"
          style={{
            backgroundImage: "url(/border_outside_tile.png)",
            backgroundRepeat: "repeat-x",
            backgroundSize: "auto 100%",
            backgroundPosition: "left bottom",
          }}
        />

        <div
          className="absolute -top-10 left-0 z-100 h-56 w-full rotate-180"
          style={{
            backgroundImage: "url(/border_outside_tile.png)",
            backgroundRepeat: "repeat-x",
            backgroundSize: "auto 100%",
            backgroundPosition: "left bottom",
          }}
        />

        <div
          className="absolute top-10 left-0 z-50 h-56 w-full rotate-180"
          style={{
            backgroundImage: "url(/border_inside.png)",
            backgroundRepeat: "repeat-x",
            backgroundSize: "396px 100%",
            backgroundPosition: "left bottom",
          }}
        />

        <div
          className="absolute bottom-10 left-0 z-50 h-56 w-full"
          style={{
            backgroundImage: "url(/border_inside.png)",
            backgroundRepeat: "repeat-x",
            backgroundSize: "396px 100%",
            backgroundPosition: "left bottom",
          }}
        />
      </div>

      <div className="fixed top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2">
        <Image
          src="/firstdate_2026_logo.png"
          alt=""
          width={1920}
          height={1080}
          className="pointer-events-none h-auto w-[110vw] max-w-[640px]"
        />
        <div className="relative">
          <span
            aria-hidden
            className="pointer-events-none absolute -inset-3 -z-10 animate-pulse rounded-full bg-[#ff6fa0] opacity-70 blur-xl"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute -inset-1.5 -z-10 animate-pulse rounded-full bg-[#ffb3cd] opacity-60 blur-md [animation-delay:0.4s]"
          />
          <Link
            href="/explore"
            className="group relative inline-flex cursor-pointer items-center gap-2 rounded-full border-2 border-white/80 bg-linear-to-b from-white to-[#ffc9dd] px-10 py-3.5 font-heading text-lg tracking-wide text-primary shadow-[0_4px_24px_rgba(196,60,110,0.4)] transition-transform duration-300 hover:scale-105 active:scale-95"
          >
            <span className="font-bold drop-shadow-[0_1px_1px_rgba(255,255,255,0.6)]">
              สำรวจชมรม
            </span>
            <Rose size={20} />
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-full border border-white/40 mask-[linear-gradient(to_bottom,black,transparent)]"
            />
          </Link>
        </div>
      </div>
    </>
  );
}
