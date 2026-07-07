type ClubPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ClubPage({ params }: ClubPageProps) {
  const { id } = await params;

  return (
    <div className="w-full px-4 pt-4">
      <h1 className="text-xl font-bold text-foreground">Club: {id}</h1>
    </div>
  );
}
