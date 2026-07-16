"use client";

import Link from "next/link";
import ExploreContent from "@/components/ExploreContent";
import InstagramIcon from "@/components/icon/InstagramIcon";
import { CLUBS } from "@/lib/clubs";
import { useLanguage } from "@/lib/i18n";
import { translations } from "@/lib/translations";

export default function Explore() {
  const { language } = useLanguage();
  const t = translations[language].explore;

  return (
    <div className="flex w-full flex-col gap-6 px-4 pt-4 pb-28">
      <div className="flex items-center justify-between gap-4 rounded-3xl bg-linear-to-b from-primary to-[#E57DA5] p-6">
        <div>
          <h1 className="font-heading text-2xl font-semibold text-white">
            {t.hello}
          </h1>
          <p className="mt-1 text-white">
            {t.subtitle}
          </p>
        </div>
        <Link
          href="https://www.instagram.com/cuatclub.chula"
          className="flex shrink-0 items-center gap-2 rounded-full bg-background px-3 py-3 text-sm font-medium text-foreground"
        >
          <InstagramIcon size={20} className="text-primary" />
        </Link>
      </div>

      <ExploreContent clubs={CLUBS} />
    </div>
  );
}
