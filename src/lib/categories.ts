import {
  BookOpen,
  Music,
  Dumbbell,
  Cpu,
  HeartHandshake,
  Leaf,
  Briefcase,
  Camera,
  type LucideIcon,
} from "lucide-react";

export type Category = {
  label: string;
  icon: LucideIcon;
  textColor: string;
  bgSoft: string;
  bgSolid: string;
};

export const CATEGORIES: Category[] = [
  { label: "วิชาการ", icon: BookOpen, textColor: "text-blue-500", bgSoft: "bg-blue-500/10", bgSolid: "bg-blue-500" },
  { label: "ศิลปะ & ดนตรี", icon: Music, textColor: "text-purple-500", bgSoft: "bg-purple-500/10", bgSolid: "bg-purple-500" },
  { label: "กีฬา", icon: Dumbbell, textColor: "text-orange-500", bgSoft: "bg-orange-500/10", bgSolid: "bg-orange-500" },
  { label: "เทคโนโลยี", icon: Cpu, textColor: "text-cyan-500", bgSoft: "bg-cyan-500/10", bgSolid: "bg-cyan-500" },
  { label: "สังคม & จิตอาสา", icon: HeartHandshake, textColor: "text-primary", bgSoft: "bg-primary/10", bgSolid: "bg-primary" },
  { label: "สิ่งแวดล้อม", icon: Leaf, textColor: "text-green-500", bgSoft: "bg-green-500/10", bgSolid: "bg-green-500" },
  { label: "ธุรกิจ", icon: Briefcase, textColor: "text-amber-500", bgSoft: "bg-amber-500/10", bgSolid: "bg-amber-500" },
  { label: "ไลฟ์สไตล์", icon: Camera, textColor: "text-teal-500", bgSoft: "bg-teal-500/10", bgSolid: "bg-teal-500" },
];

export function getCategory(label: string): Category {
  return CATEGORIES.find((c) => c.label === label) ?? CATEGORIES[0];
}
