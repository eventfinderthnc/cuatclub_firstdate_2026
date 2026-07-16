"use client";

import { Search } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { translations } from "@/lib/translations";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function SearchBar({ value, onChange }: SearchBarProps) {
  const { language } = useLanguage();

  return (
    <div className="w-full flex items-center gap-3 rounded-full bg-surface py-2 pl-6 pr-2">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={translations[language].explore.searchPlaceholder}
        className="flex-1 bg-transparent text-foreground outline-none placeholder:text-stone"
      />
      <button
        type="button"
        aria-label="Search"
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-white"
      >
        <Search size={20} strokeWidth={2} />
      </button>
    </div>
  );
}
