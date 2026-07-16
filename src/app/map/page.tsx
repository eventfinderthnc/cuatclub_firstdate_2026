import MapView from "@/components/MapView";

export default function Map() {
  return (
    <div className="flex w-full flex-col">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[#E7E7E7]" />
      <MapView />
    </div>
  );
}
