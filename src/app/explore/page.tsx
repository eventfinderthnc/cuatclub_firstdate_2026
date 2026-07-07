import Link from "next/link";
import ExploreContent from "@/components/ExploreContent";
import InstagramIcon from "@/components/icon/InstagramIcon";

const CLUBS = [
  {
    id: 1,
    name: "Thinc.",
    category: "วิชาการ",
    description: "Thinc. is a student-run community aiming to make impact to society.",
    location: "Student Union, Room 302",
  },
  {
    id: 2,
    name: "Chula Music Club",
    category: "ศิลปะ & ดนตรี",
    description: "A community for students who love music, performance, and creativity.",
    location: "Student Union, Room 210",
  },
  {
    id: 3,
    name: "Debate Society",
    category: "วิชาการ",
    description: "Sharpen your critical thinking and public speaking through debate.",
    location: "Building 4, Room 105",
  },
  {
    id: 4,
    name: "Chula Runners",
    category: "กีฬา",
    description: "Weekly running club for students who want to stay fit and make friends.",
    location: "Sports Complex, Track Field",
  },
  {
    id: 5,
    name: "Football Club",
    category: "กีฬา",
    description: "Join our football team for training sessions and friendly matches.",
    location: "Sports Complex, Field 2",
  },
  {
    id: 6,
    name: "Chula Coding Club",
    category: "เทคโนโลยี",
    description: "Learn to code, build projects, and join hackathons together.",
    location: "Engineering Building, Room 401",
  },
  {
    id: 7,
    name: "Robotics Society",
    category: "เทคโนโลยี",
    description: "Design and build robots for national and international competitions.",
    location: "Engineering Building, Lab 3",
  },
  {
    id: 8,
    name: "Volunteer Spirit",
    category: "สังคม & จิตอาสา",
    description: "Organizing volunteer camps and community outreach activities.",
    location: "Student Union, Room 105",
  },
  {
    id: 9,
    name: "Big Brother Big Sister",
    category: "สังคม & จิตอาสา",
    description: "Mentoring freshmen and helping them adjust to university life.",
    location: "Student Union, Room 108",
  },
  {
    id: 10,
    name: "Green Chula",
    category: "สิ่งแวดล้อม",
    description: "Promoting sustainability and eco-friendly practices on campus.",
    location: "Building 6, Room 201",
  },
  {
    id: 11,
    name: "Young Entrepreneurs",
    category: "ธุรกิจ",
    description: "A community for students who want to start their own business.",
    location: "Business Building, Room 302",
  },
  {
    id: 12,
    name: "Investment Club",
    category: "ธุรกิจ",
    description: "Learn about stocks, funds, and personal finance from real practitioners.",
    location: "Business Building, Room 305",
  },
  {
    id: 13,
    name: "Photography Club",
    category: "ไลฟ์สไตล์",
    description: "Explore photography techniques and join photo walks around campus.",
    location: "Student Union, Room 210",
  },
];

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
