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
  }[];
};

export const MAP_PINS: MapPin[] = [
  {
    id: 2,
    name: "คณะ",
    type: "faculty",
    description:
      "โซนบูธคณะต่างๆ ได้แก่ นิติศาสตร์ เศรษฐศาสตร์ วิทยาศาสตร์การกีฬา ทันตแพทยศาสตร์ สัตวแพทยศาสตร์ รัฐศาสตร์ สหเวชศาสตร์ และวิทยาศาสตร์",
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
      { x: 28.8, y: 64.8, name: "Thinc.", description: "Thinc. is a student-run community aiming to make impact to society.", link: "/explore/1", linkLabel: "ดูรายละเอียดชมรม" },
      { x: 33.5, y: 64.8, name: "Chula Music Club", description: "A community for students who love music, performance, and creativity.", link: "/explore/2", linkLabel: "ดูรายละเอียดชมรม" },
      { x: 35.0, y: 64.8, name: "Debate Society", description: "Sharpen your critical thinking and public speaking through debate.", link: "/explore/3", linkLabel: "ดูรายละเอียดชมรม" },
      { x: 39.6, y: 64.8, name: "Chula Runners", description: "Weekly running club for students who want to stay fit and make friends.", link: "/explore/4", linkLabel: "ดูรายละเอียดชมรม" },
      { x: 28.8, y: 68.9, name: "Football Club", description: "Join our football team for training sessions and friendly matches.", link: "/explore/5", linkLabel: "ดูรายละเอียดชมรม" },
      { x: 33.5, y: 68.9, name: "Chula Coding Club", description: "Learn to code, build projects, and join hackathons together.", link: "/explore/6", linkLabel: "ดูรายละเอียดชมรม" },
      { x: 35.0, y: 68.9, name: "Robotics Society", description: "Design and build robots for national and international competitions.", link: "/explore/7", linkLabel: "ดูรายละเอียดชมรม" },
      { x: 39.6, y: 68.9, name: "Volunteer Spirit", description: "Organizing volunteer camps and community outreach activities.", link: "/explore/8", linkLabel: "ดูรายละเอียดชมรม" },
      { x: 28.8, y: 74.1, name: "Big Brother Big Sister", description: "Mentoring freshmen and helping them adjust to university life.", link: "/explore/9", linkLabel: "ดูรายละเอียดชมรม" },
      { x: 33.5, y: 74.1, name: "Green Chula", description: "Promoting sustainability and eco-friendly practices on campus.", link: "/explore/10", linkLabel: "ดูรายละเอียดชมรม" },
      { x: 35.0, y: 74.1, name: "Young Entrepreneurs", description: "A community for students who want to start their own business.", link: "/explore/11", linkLabel: "ดูรายละเอียดชมรม" },
      { x: 39.6, y: 74.1, name: "Investment Club", description: "Learn about stocks, funds, and personal finance from real practitioners.", link: "/explore/12", linkLabel: "ดูรายละเอียดชมรม" },
      { x: 28.8, y: 78.2, name: "Photography Club", description: "Explore photography techniques and join photo walks around campus.", link: "/explore/13", linkLabel: "ดูรายละเอียดชมรม" },
      { x: 33.5, y: 78.2, name: "Thinc.", description: "Thinc. is a student-run community aiming to make impact to society.", link: "/explore/1", linkLabel: "ดูรายละเอียดชมรม" },
      { x: 35.0, y: 78.2, name: "Chula Music Club", description: "A community for students who love music, performance, and creativity.", link: "/explore/2", linkLabel: "ดูรายละเอียดชมรม" },
      { x: 39.6, y: 78.2, name: "Debate Society", description: "Sharpen your critical thinking and public speaking through debate.", link: "/explore/3", linkLabel: "ดูรายละเอียดชมรม" },
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
    subPins: [
      { x: 66.6, y: 65.3, name: "Thinc.", description: "Thinc. is a student-run community aiming to make impact to society.", link: "/explore/1", linkLabel: "ดูรายละเอียด" },
      { x: 66.6, y: 67.2, name: "Chula Music Club", description: "A community for students who love music, performance, and creativity.", link: "/explore/2", linkLabel: "ดูรายละเอียด" },
      { x: 66.6, y: 69.2, name: "Debate Society", description: "Sharpen your critical thinking and public speaking through debate.", link: "/explore/3", linkLabel: "ดูรายละเอียด" },
      { x: 66.6, y: 71.1, name: "Chula Runners", description: "Weekly running club for students who want to stay fit and make friends.", link: "/explore/4", linkLabel: "ดูรายละเอียด" },
      { x: 66.6, y: 73.1, name: "Football Club", description: "Join our football team for training sessions and friendly matches.", link: "/explore/5", linkLabel: "ดูรายละเอียด" },
      { x: 66.6, y: 75.1, name: "Chula Coding Club", description: "Learn to code, build projects, and join hackathons together.", link: "/explore/6", linkLabel: "ดูรายละเอียด" },
      { x: 66.6, y: 77.0, name: "Robotics Society", description: "Design and build robots for national and international competitions.", link: "/explore/7", linkLabel: "ดูรายละเอียด" },
      { x: 66.6, y: 79.0, name: "Volunteer Spirit", description: "Organizing volunteer camps and community outreach activities.", link: "/explore/8", linkLabel: "ดูรายละเอียด" },
      { x: 66.6, y: 81.0, name: "Big Brother Big Sister", description: "Mentoring freshmen and helping them adjust to university life.", link: "/explore/9", linkLabel: "ดูรายละเอียด" },
      { x: 66.6, y: 82.9, name: "Green Chula", description: "Promoting sustainability and eco-friendly practices on campus.", link: "/explore/10", linkLabel: "ดูรายละเอียด" },
      { x: 66.6, y: 84.9, name: "Young Entrepreneurs", description: "A community for students who want to start their own business.", link: "/explore/11", linkLabel: "ดูรายละเอียด" },
    ],
  },
  {
    id: 11,
    name: "องค์กร",
    type: "organization",
    description: "โซนบูธองค์กรต่างๆภายในงาน",
    x: 50,
    y: 89,
    subPins: [
      { x: 52.0, y: 89.9, name: "Thinc.", description: "Thinc. is a student-run community aiming to make impact to society.", link: "/explore/1", linkLabel: "ดูรายละเอียด" },
      { x: 53.1, y: 89.9, name: "Chula Music Club", description: "A community for students who love music, performance, and creativity.", link: "/explore/2", linkLabel: "ดูรายละเอียด" },
      { x: 54.2, y: 89.9, name: "Debate Society", description: "Sharpen your critical thinking and public speaking through debate.", link: "/explore/3", linkLabel: "ดูรายละเอียด" },
      { x: 55.3, y: 89.9, name: "Chula Runners", description: "Weekly running club for students who want to stay fit and make friends.", link: "/explore/4", linkLabel: "ดูรายละเอียด" },
      { x: 56.4, y: 89.9, name: "Football Club", description: "Join our football team for training sessions and friendly matches.", link: "/explore/5", linkLabel: "ดูรายละเอียด" },
      { x: 57.5, y: 89.9, name: "Chula Coding Club", description: "Learn to code, build projects, and join hackathons together.", link: "/explore/6", linkLabel: "ดูรายละเอียด" },
      { x: 58.5, y: 89.9, name: "Robotics Society", description: "Design and build robots for national and international competitions.", link: "/explore/7", linkLabel: "ดูรายละเอียด" },
      { x: 59.6, y: 89.9, name: "Volunteer Spirit", description: "Organizing volunteer camps and community outreach activities.", link: "/explore/8", linkLabel: "ดูรายละเอียด" },
      { x: 60.7, y: 89.9, name: "Big Brother Big Sister", description: "Mentoring freshmen and helping them adjust to university life.", link: "/explore/9", linkLabel: "ดูรายละเอียด" },
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
