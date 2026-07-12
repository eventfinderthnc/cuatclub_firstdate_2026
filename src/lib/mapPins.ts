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
  // Individual booth/rectangle positions inside this zone, revealed in place
  // of the single zone pin once the user zooms in close enough.
  subPins?: { x: number; y: number }[];
};

export const MAP_PINS: MapPin[] = [
  {
    id: 2,
    name: "อาคารคณะ",
    type: "faculty",
    description:
      "โซนอาคารคณะต่างๆ ได้แก่ นิติศาสตร์ เศรษฐศาสตร์ วิทยาศาสตร์การกีฬา ทันตแพทยศาสตร์ สัตวแพทยศาสตร์ รัฐศาสตร์ สหเวชศาสตร์ และวิทยาศาสตร์",
    x: 30,
    y: 30,
    subPins: [
      { x: 24.8, y: 24.5 },
      { x: 27.3, y: 24.5 },
      { x: 33.1, y: 24.5 },
      { x: 35.6, y: 24.5 },
      { x: 41.9, y: 24.5 },
      { x: 44.5, y: 24.5 },
      { x: 26.2, y: 34.9 },
      { x: 32.2, y: 34.9 },
      { x: 37.3, y: 34.9 },
      { x: 44.5, y: 34.9 },
      { x: 24.8, y: 44.4 },
      { x: 27.3, y: 44.4 },
      { x: 33.1, y: 44.4 },
      { x: 35.6, y: 44.4 },
      { x: 41.9, y: 44.4 },
      { x: 44.5, y: 44.4 },
    ],
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
    subPins: [
      { x: 28.8, y: 64.8 },
      { x: 33.5, y: 64.8 },
      { x: 35.0, y: 64.8 },
      { x: 39.6, y: 64.8 },
      { x: 28.8, y: 68.9 },
      { x: 33.5, y: 68.9 },
      { x: 35.0, y: 68.9 },
      { x: 39.6, y: 68.9 },
      { x: 28.8, y: 74.1 },
      { x: 33.5, y: 74.1 },
      { x: 35.0, y: 74.1 },
      { x: 39.6, y: 74.1 },
      { x: 28.8, y: 78.2 },
      { x: 33.5, y: 78.2 },
      { x: 35.0, y: 78.2 },
      { x: 39.6, y: 78.2 },
    ],
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
    description: "โซนกิจกรรมเวิร์กช็อปจากชมรมและองค์กรต่างๆ",
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
    subPins: [
      { x: 66.6, y: 65.3 },
      { x: 66.6, y: 67.2 },
      { x: 66.6, y: 69.2 },
      { x: 66.6, y: 71.1 },
      { x: 66.6, y: 73.1 },
      { x: 66.6, y: 75.1 },
      { x: 66.6, y: 77.0 },
      { x: 66.6, y: 79.0 },
      { x: 66.6, y: 81.0 },
      { x: 66.6, y: 82.9 },
      { x: 66.6, y: 84.9 },
    ],
  },
  {
    id: 11,
    name: "องค์กร (Warrix)",
    type: "organization",
    description: "โซนบูธองค์กรและร้านค้า Warrix ด้านหน้าคณะวิศวกรรมศาสตร์",
    x: 50,
    y: 89,
    subPins: [
      { x: 52.0, y: 89.9 },
      { x: 53.1, y: 89.9 },
      { x: 54.2, y: 89.9 },
      { x: 55.3, y: 89.9 },
      { x: 56.4, y: 89.9 },
      { x: 57.5, y: 89.9 },
      { x: 58.5, y: 89.9 },
      { x: 59.6, y: 89.9 },
      { x: 60.7, y: 89.9 },
    ],
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
    description: "จุดปฐมพยาบาลใกล้อาคาร OPER สำหรับเหตุฉุกเฉินระหว่างงาน",
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
    description: "จุดปฐมพยาบาลบริเวณโซนชมรม",
    x: 66,
    y: 14,
  },
];
