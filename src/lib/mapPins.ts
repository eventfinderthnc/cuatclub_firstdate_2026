import { CLUBS } from "@/lib/clubs";

export type MapPinType =
  | "faculty"
  | "club"
  | "shop"
  | "facility"
  | "landmark"
  | "service"
  | "parking"
  | "registration"
  | "workshop"
  | "organization"
  | "building";

export type MapPin = {
  id: number;
  name: string;
  type: MapPinType;
  description: string;
  x: number;
  y: number;
  link?: string;
  // Custom CTA button label for `link`; falls back to a generic label if omitted.
  linkLabel?: string;
  // Club logo shown in the detail sheet instead of the generic type icon.
  logoSrc?: string;
  // Individual booth/rectangle positions inside this zone, revealed in place
  // of the single zone pin once the user zooms in close enough. Each can
  // carry its own name/description/link/linkLabel that overrides the zone's;
  // omit a field to fall back to the zone's value (e.g. faculty booths have no link).
  subPins?: {
    x: number;
    y: number;
    name?: string;
    description?: string;
    link?: string;
    linkLabel?: string;
    // Booth code (e.g. "A1"), shown on the map marker instead of the zone icon.
    label?: string;
    // Club logo shown in the detail sheet instead of the generic type icon.
    logoSrc?: string;
  }[];
};

type BoothCoord = { x: number; y: number; label: string };

// Builds a booth subPin from club.ts data by matching `Club.location` against
// the booth code (e.g. "A1"). Booths with no matching club get mock content.
function buildBoothSubPin({ x, y, label }: BoothCoord, linkLabel: string) {
  const club = CLUBS.find((c) => c.location === label);

  if (club) {
    return {
      x,
      y,
      name: club.name.split("|")[0].trim(),
      description: club.description,
      link: `/explore/${club.id}`,
      linkLabel,
      label,
      logoSrc: club.logoSrc,
    };
  }

  return {
    x,
    y,
    name: `บูธ ${label}`,
    description: "ข้อมูลชมรมนี้จะอัปเดตเร็วๆ นี้",
    label,
  };
}

// Club zone (id 4): 4 columns A–D, 8 booths each, top to bottom.
const CLUB_BOOTH_COORDS: BoothCoord[] = [
  { x: 28.5, y: 64.8, label: "A1" },
  { x: 28.5, y: 66.6, label: "A2" },
  { x: 28.5, y: 68.2, label: "A3" },
  { x: 28.5, y: 69.8, label: "A4" },
  { x: 28.5, y: 74.1, label: "A5" },
  { x: 28.5, y: 75.5, label: "A6" },
  { x: 28.5, y: 77.2, label: "A7" },
  { x: 28.5, y: 79.2, label: "A8" },
  { x: 32.9, y: 64.8, label: "B1" },
  { x: 32.9, y: 66.6, label: "B2" },
  { x: 32.9, y: 68.2, label: "B3" },
  { x: 32.9, y: 69.8, label: "B4" },
  { x: 32.9, y: 74.1, label: "B5" },
  { x: 32.9, y: 75.5, label: "B6" },
  { x: 32.9, y: 77.2, label: "B7" },
  { x: 32.9, y: 79.2, label: "B8" },
  { x: 34.3, y: 64.8, label: "C1" },
  { x: 34.3, y: 66.6, label: "C2" },
  { x: 34.3, y: 68.2, label: "C3" },
  { x: 34.3, y: 69.8, label: "C4" },
  { x: 34.3, y: 74.1, label: "C5" },
  { x: 34.3, y: 75.5, label: "C6" },
  { x: 34.3, y: 77.2, label: "C7" },
  { x: 34.3, y: 79.2, label: "C8" },
  { x: 39.0, y: 64.8, label: "D1" },
  { x: 39.0, y: 66.6, label: "D2" },
  { x: 39.0, y: 68.2, label: "D3" },
  { x: 39.0, y: 69.8, label: "D4" },
  { x: 39.0, y: 74.1, label: "D5" },
  { x: 39.0, y: 75.5, label: "D6" },
  { x: 39.0, y: 77.2, label: "D7" },
  { x: 39.0, y: 79.2, label: "D8" },
];

// Organization zone (id 10): column E, 9 booths, top to bottom.
const ORG_BOOTH_COORDS_E: BoothCoord[] = [
  { x: 66.1, y: 65.3, label: "E1" },
  { x: 66.1, y: 68.0, label: "E2" },
  { x: 66.1, y: 70.0, label: "E3" },
  { x: 66.1, y: 72.6, label: "E4" },
  { x: 66.1, y: 74.6, label: "E5" },
  { x: 66.1, y: 77.0, label: "E6" },
  { x: 66.1, y: 79.0, label: "E7" },
  { x: 66.1, y: 81.5, label: "E8" },
  { x: 66.1, y: 83.9, label: "E9" },
];

// Organization zone (id 11): row F, 9 booths, top to bottom.
const ORG_BOOTH_COORDS_F: BoothCoord[] = [
  { x: 59.9, y: 89.9, label: "F1" },
  { x: 58.5, y: 89.9, label: "F2" },
  { x: 57.0, y: 89.9, label: "F3" },
  { x: 55.8, y: 89.9, label: "F4" },
  { x: 54.2, y: 89.9, label: "F5" },
  { x: 53.2, y: 89.9, label: "F6" },
  { x: 51.7, y: 89.9, label: "F7" },
  { x: 50.5, y: 89.9, label: "F8" },
  { x: 49.0, y: 89.9, label: "F9" },
];

export const MAP_PINS: MapPin[] = [
  {
    id: 2,
    name: "คณะ",
    type: "faculty",
    description:
      "โซนบูธคณะต่างๆ ได้แก่ นิติศาสตร์ เศรษฐศาสตร์ วิทยาศาสตร์การกีฬา ทันตแพทยศาสตร์ สัตวแพทยศาสตร์ รัฐศาสตร์ สหเวชศาสตร์ และวิทยาศาสตร์",
    x: 33,
    y: 35,
  },
  {
    id: 3,
    name: "ร้านค้า",
    type: "shop",
    description: "โซนร้านค้าและของกินเล่น เปิดขายตลอดงาน",
    x: 33,
    y: 57,
  },
  {
    id: 4,
    name: "ชมรม",
    type: "club",
    description:
      "โซนบูธชมรมต่างๆ ของจุฬาฯ มาเดินดูกิจกรรมและสมัครเข้าร่วมชมรมที่สนใจได้ที่นี่",
    x: 32,
    y: 72,
    link: "/explore",
    subPins: CLUB_BOOTH_COORDS.map((coord) => buildBoothSubPin(coord, "ดูรายละเอียดชมรม")),
  },
  {
    id: 5,
    name: "จุดลงทะเบียน",
    type: "registration",
    description: "จุดลงทะเบียนเข้างานสำหรับนิสิตใหม่และผู้เข้าร่วมงาน",
    x: 13,
    y: 92,
  },
  {
    id: 6,
    name: "ลานจามจุรี",
    type: "landmark",
    description: "ลานจัดนิทรรศการและกิจกรรมกลางแจ้งบริเวณลานจามจุรี",
    x: 60,
    y: 32,
  },
  {
    id: 7,
    name: "พระบรมราชานุสาวรีย์สองรัชกาล",
    type: "landmark",
    description: "จุดสักการะพระบรมราชานุสาวรีย์สองรัชกาล สัญลักษณ์สำคัญของจุฬาฯ",
    x: 51,
    y: 50,
  },
  {
    id: 8,
    name: "Workshop",
    type: "workshop",
    description: "โซนกิจกรรมเวิร์กช็อปต่างๆในงาน",
    x: 70,
    y: 33,
  },
  {
    id: 9,
    name: "ลานจอดรถ",
    type: "parking",
    description: "ลานจอดรถสำหรับผู้เข้าร่วมงาน",
    x: 82,
    y: 33,
  },
  {
    id: 10,
    name: "องค์กร",
    type: "organization",
    description: "โซนบูธองค์กรกิจกรรมนิสิต บริเวณใกล้พระบรมราชานุสาวรีย์",
    x: 64,
    y: 73,
    subPins: ORG_BOOTH_COORDS_E.map((coord) => buildBoothSubPin(coord, "ดูรายละเอียด")),
  },
  {
    id: 11,
    name: "องค์กร",
    type: "organization",
    description: "โซนบูธองค์กรต่างๆภายในงาน",
    x: 50,
    y: 89,
    subPins: ORG_BOOTH_COORDS_F.map((coord) => buildBoothSubPin(coord, "ดูรายละเอียด")),
  },
  {
    id: 12,
    name: "หอประชุมจุฬาลงกรณ์มหาวิทยาลัย",
    type: "landmark",
    description: "หอประชุมใหญ่ ใช้จัดงานพิธีการและกิจกรรมสำคัญของมหาวิทยาลัย",
    x: 79,
    y: 51,
  },
  {
    id: 13,
    name: "ลานประชุมกร",
    type: "landmark",
    description: "ลานกิจกรรมและเวทีการแสดงหลักของงาน",
    x: 85,
    y: 75,
  },
  {
    id: 14,
    name: "คณะวิทยาศาสตร์",
    type: "building",
    description: "อาคารคณะวิทยาศาสตร์",
    x: 38,
    y: 95,
  },
  {
    id: 15,
    name: "คณะวิศวกรรมศาสตร์",
    type: "building",
    description: "อาคารคณะวิศวกรรมศาสตร์",
    x: 85,
    y: 95,
  },
  {
    id: 16,
    name: "จุดปฐมพยาบาล",
    type: "service",
    description: "จุดปฐมพยาบาลใกล้โซนบูธคณะ",
    x: 44,
    y: 35,
  },
  {
    id: 17,
    name: "จุดปฐมพยาบาล",
    type: "service",
    description: "จุดปฐมพยาบาลบริเวณโซนชมรม",
    x: 21,
    y: 84,
  },
  {
    id: 18,
    name: "จุดปฐมพยาบาล",
    type: "service",
    description: "จุดปฐมพยาบาลบริเวณใกล้ที่จอดรถ",
    x: 66,
    y: 14,
  },
];
