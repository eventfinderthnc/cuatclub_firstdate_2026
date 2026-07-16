"use client";

import { useState } from "react";
import Image from "next/image";

const LANGUAGES = [
  { code: "th", label: "TH" },
  { code: "en", label: "EN" },
] as const;

export default function Header() {
  const [language, setLanguage] = useState<"th" | "en">("th");

  return (
    <header className="w-full flex items-center justify-between px-4 py-3">
      <Image src="/cuatclub_logo.svg" alt="Cuatclub" width={70} height={35} priority />
      <div className="flex items-center rounded-full bg-surface p-1">
        {LANGUAGES.map(({ code, label }) => {
          const isActive = language === code;

          return (
            <button
              key={code}
              type="button"
              onClick={() => setLanguage(code)}
              className={`cursor-pointer rounded-full px-4 py-2 text-sm font-medium ${
                isActive ? "bg-primary text-white" : "text-stone"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>
    </header>
  );
}
