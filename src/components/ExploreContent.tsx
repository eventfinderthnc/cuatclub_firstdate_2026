"use client";

import { useMemo, useState } from "react";
import SearchBar from "@/components/SearchBar";
import ClubCard from "@/components/ClubCard";
import CategoryFilter from "@/components/CategoryFilter";

type Club = {
  id: number;
  name: string;
  category: string[];
  description: string;
  location: string;
  logoSrc?: string;
};

type ExploreContentProps = {
  clubs: Club[];
};

export default function ExploreContent({ clubs }: ExploreContentProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [search, setSearch] = useState("");

  const toggleCategory = (label: string) => {
    setSelectedCategories((prev) =>
      prev.includes(label) ? prev.filter((c) => c !== label) : [...prev, label]
    );
  };

  const filteredClubs = useMemo(() => {
    const query = search.trim().toLowerCase();

    return clubs.filter((club) => {
      const matchesCategory =
        selectedCategories.length === 0 ||
        club.category.some((tag) => selectedCategories.includes(tag));

      const matchesSearch =
        query === "" ||
        [club.name, ...club.category, club.description, club.location].some((field) =>
          field.toLowerCase().includes(query)
        );

      return matchesCategory && matchesSearch;
    });
  }, [clubs, selectedCategories, search]);

  return (
    <div className="flex flex-col gap-4">
      <CategoryFilter selected={selectedCategories} onToggle={toggleCategory} />
      <SearchBar value={search} onChange={setSearch} />
      {filteredClubs.map((club) => (
        <ClubCard key={club.id} {...club} />
      ))}
    </div>
  );
}
