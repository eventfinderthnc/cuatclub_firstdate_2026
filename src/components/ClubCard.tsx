"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowRight, MapPin, Users } from "lucide-react";
import { getCategory } from "@/lib/categories";

type ClubCardProps = {
  id: number;
  name: string;
  category: string;
  description: string;
  location: string;
  logoSrc?: string;
};

export default function ClubCard({
  id,
  name,
  category,
  description,
  location,
  logoSrc,
}: ClubCardProps) {
  const router = useRouter();
  const { textColor, bgSoft } = getCategory(category);

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => router.push(`/explore/${id}`)}
      onKeyDown={(e) => {
        if (e.key === "Enter") router.push(`/explore/${id}`);
      }}
      className="w-full cursor-pointer rounded-2xl border border-border bg-background p-5 shadow-[0_0_30px_var(--color-shadow-black)] transition-colors hover:border-primary/40 md:shadow-none"
    >
      <div className="flex items-start justify-between">
        <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-primary/30">
          {logoSrc ? (
            <Image
              src={logoSrc}
              alt={name}
              width={56}
              height={56}
              className="object-cover"
            />
          ) : (
            <Users size={24} className="text-primary" />
          )}
        </div>
        <span className={`rounded-full px-4 py-1.5 text-sm font-medium ${bgSoft} ${textColor}`}>
          {category}
        </span>
      </div>

      <h3 className="mt-4 text-xl font-bold text-foreground">{name}</h3>
      <p className="mt-2 text-charcoal">{description}</p>

      <div className="mt-4 flex items-center gap-2 border-t border-border pt-3 text-stone">
        <MapPin size={16} />
        <span className="text-sm">{location}</span>
      </div>

      <div className="mt-4 flex items-center w-full justify-between text-base font-medium text-primary">
        <span>ดูชมรม</span>
        <ArrowRight size={20} />
      </div>
    </div>
  );
}
