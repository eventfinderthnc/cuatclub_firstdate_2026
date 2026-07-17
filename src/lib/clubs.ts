import clubsData from "@/data/clubs.json";

export type ClubSocial = {
  website?: string;
  instagram?: string;
  facebook?: string;
  tiktok?: string;
  lineOA?: string;
};

export type Club = {
  id: number;
  name: string;
  category: string;
  organization: string;
  description: string;
  about: string;
  location: string;
  logoSrc?: string;
  coverImages?: string[];
  social?: ClubSocial;
};

export const CLUBS: Club[] = clubsData as Club[];

export function getClubById(id: number): Club | undefined {
  return CLUBS.find((club) => club.id === id);
}
