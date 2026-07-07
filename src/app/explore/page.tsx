import Link from "next/link";
import ExploreContent from "@/components/ExploreContent";
import InstagramIcon from "@/components/icon/InstagramIcon";
import { CLUBS } from "@/lib/clubs";

export default function Explore() {
  return (
    <div className="flex w-full flex-col gap-6 px-4 pt-4 pb-28">
      <div className="flex items-center justify-between gap-4 rounded-3xl bg-linear-to-b from-primary to-[#E57DA5] p-6">
        <div>
          <h1 className="font-heading text-2xl font-semibold text-white">
            สวัสดีน้องใหม่!
          </h1>
          <p className="mt-1 text-white">
            กลัวพลาดกิจกรรมดีๆ ? ติดตามกิจกรรม จากหลายชมรมในจุฬา
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
