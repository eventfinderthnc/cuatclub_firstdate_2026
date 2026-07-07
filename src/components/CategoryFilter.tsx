"use client";

import { CATEGORIES } from "@/lib/categories";

type CategoryFilterProps = {
  selected: string[];
  onToggle: (label: string) => void;
};

export default function CategoryFilter({ selected, onToggle }: CategoryFilterProps) {
  return (
    <div className="grid grid-cols-4 gap-x-2 gap-y-4 md:grid-cols-8">
      {CATEGORIES.map(({ label, icon: Icon, textColor, bgSoft, bgSolid }) => {
        const isSelected = selected.includes(label);

        return (
          <button
            key={label}
            type="button"
            onClick={() => onToggle(label)}
            className="flex flex-col items-center gap-2"
          >
            <div
              className={`flex h-16 w-16 cursor-pointer items-center justify-center rounded-full ${
                isSelected
                  ? `${bgSolid} text-white shadow-[0_0_16px_var(--color-shadow-black)]`
                  : `${bgSoft} ${textColor}`
              }`}
            >
              <Icon size={22} strokeWidth={2} />
            </div>
            <span
              className={`text-center font-medium text-xs transition-colors duration-200 ${
                isSelected ? `${textColor}` : "text-stone"
              }`}
            >
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
