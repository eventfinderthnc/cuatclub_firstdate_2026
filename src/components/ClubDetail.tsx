"use client"

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Building2, Globe, MapPin, Users, X } from "lucide-react";
import type { Club } from "@/lib/clubs";
import { getCategory } from "@/lib/categories";
import InstagramIcon from "@/components/icon/InstagramIcon";
import FacebookIcon from "@/components/icon/FacebookIcon";
import TiktokIcon from "@/components/icon/TiktokIcon";
import LineIcon from "@/components/icon/LineIcon";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/i18n";
import { getCategoryLabel } from "@/lib/translations";

type ClubDetailProps = {
  club: Club;
};

export default function ClubDetail({ club }: ClubDetailProps) {
  const router = useRouter();
  const { language } = useLanguage();
  const gallery = club.coverImages ?? [];
  const [renderedImage, setRenderedImage] = useState<string | null>(null);
  const [previewVisible, setPreviewVisible] = useState(false);

  const openPreview = (src: string) => {
    setRenderedImage(src);
    requestAnimationFrame(() => setPreviewVisible(true));
  };

  const closePreview = () => {
    setPreviewVisible(false);
    setTimeout(() => setRenderedImage(null), 200);
  };
  const rotations = [
    "-rotate-3",
    "rotate-2",
    "-rotate-2",
    "rotate-3",
    "-rotate-1",
    "rotate-1",
  ];
  const hasSocial =
    club.social &&
    (club.social.website ||
      club.social.instagram ||
      club.social.facebook ||
      club.social.tiktok ||
      club.social.lineOA);

  return (
    <div className="flex w-full flex-col gap-4 p-4 pb-28 min-h-dvh">
      <div
        onClick={() => router.back()}
        className="flex items-center gap-1 w-full h-fit text-stone cursor-pointer"
      >
        <ArrowLeft size={20} />
        <p className="text-sm font-medium">ย้อนกลับ</p>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex justify-between">
          <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-4 border-background bg-white">
            {club.logoSrc ? (
              <Image
                src={club.logoSrc}
                alt={club.name}
                width={96}
                height={96}
                className="object-cover"
              />
            ) : (
              <Users size={36} className="text-primary" />
            )}
          </div>
          <div className="flex h-fit flex-wrap justify-end gap-1.5">
            {club.category.map((tag) => {
              const { textColor, bgSoft } = getCategory(tag);
              return (
                <span
                  key={tag}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium ${bgSoft} ${textColor}`}
                >
                  {getCategoryLabel(tag, language)}
                </span>
              );
            })}
          </div>
        </div>

        <div>
          <h1 className="font-heading text-2xl font-semibold text-foreground">
            {club.name}
          </h1>
          <div className="mt-2 flex items-center gap-2 text-stone">
            <Building2 size={16} />
            <span className="text-sm">{club.organization}</span>
          </div>
          <div className="mt-2 flex items-center gap-2 text-stone">
            <MapPin size={16} />
            <span className="text-sm">Booth {club.location}</span>
          </div>
        </div>

        {gallery.length > 0 && (
            <div className="flex gap-4 overflow-x-auto px-2 py-3">
              {gallery.map((src, index) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => openPreview(src)}
                  className={`relative h-32 w-32 shrink-0 cursor-pointer overflow-hidden rounded-2xl bg-border shadow-[0_0_16px_var(--color-shadow-black)] transition-transform hover:rotate-0 ${
                    rotations[index % rotations.length]
                  }`}
                >
                  <Image
                    src={src}
                    alt={`${club.name} activity ${index + 1}`}
                    fill
                    sizes="128px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
        )}

        <div>
          <h2 className="font-heading text-lg font-semibold text-foreground">
            เกี่ยวกับชมรม
          </h2>
          <p className="mt-2 leading-relaxed text-charcoal">{club.about}</p>
        </div>

        {hasSocial && (
          <div>
            <h2 className="font-heading text-lg font-semibold text-foreground">
              ช่องทางติดต่อ
            </h2>
            <div className="mt-3 flex flex-wrap gap-3">
              {club.social?.website && (
                <Link
                  href={club.social.website}
                  target="_blank"
                  className="flex items-center gap-2 rounded-full bg-surface px-4 py-2.5 text-sm font-medium text-foreground"
                >
                  <Globe size={18} className="text-primary" />
                  เว็บไซต์
                </Link>
              )}
              {club.social?.instagram && (
                <Link
                  href={club.social.instagram}
                  target="_blank"
                  className="flex items-center gap-2 rounded-full bg-surface px-4 py-2.5 text-sm font-medium text-foreground"
                >
                  <InstagramIcon size={18} className="text-primary" />
                  Instagram
                </Link>
              )}
              {club.social?.facebook && (
                <Link
                  href={club.social.facebook}
                  target="_blank"
                  className="flex items-center gap-2 rounded-full bg-surface px-4 py-2.5 text-sm font-medium text-foreground"
                >
                  <FacebookIcon size={18} className="text-primary" />
                  Facebook
                </Link>
              )}
              {club.social?.tiktok && (
                <Link
                  href={club.social.tiktok}
                  target="_blank"
                  className="flex items-center gap-2 rounded-full bg-surface px-4 py-2.5 text-sm font-medium text-foreground"
                >
                  <TiktokIcon size={18} className="text-primary" />
                  TikTok
                </Link>
              )}
              {club.social?.lineOA && (
                <Link
                  href={club.social.lineOA}
                  target="_blank"
                  className="flex items-center gap-2 rounded-full bg-surface px-4 py-2.5 text-sm font-medium text-foreground"
                >
                  <LineIcon size={18} className="text-primary" />
                  LINE OA
                </Link>
              )}
            </div>
          </div>
        )}
      </div>

      {renderedImage && (
        <div
          onClick={closePreview}
          className={`fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6 transition-opacity duration-200 ${
            previewVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <button
            type="button"
            onClick={closePreview}
            aria-label="ปิด"
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-background/80 text-foreground"
          >
            <X size={20} />
          </button>
          <div
            onClick={(e) => e.stopPropagation()}
            className={`relative h-full max-h-[80vh] w-full max-w-[600px] transition-transform duration-200 ${
              previewVisible ? "scale-100" : "scale-95"
            }`}
          >
            <Image
              src={renderedImage}
              alt={`${club.name} full photo`}
              fill
              sizes="600px"
              className="object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}
