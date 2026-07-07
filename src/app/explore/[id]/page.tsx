import { notFound } from "next/navigation";
import { getClubById } from "@/lib/clubs";
import ClubDetail from "@/components/ClubDetail";

type ClubPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ClubPage({ params }: ClubPageProps) {
  const { id } = await params;
  const club = getClubById(Number(id));

  if (!club) {
    notFound();
  }

  return <ClubDetail club={club} />;
}
