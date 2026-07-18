import type { Language } from "@/lib/i18n";

export const translations = {
  th: {
    nav: { explore: "สำรวจ", home: "หน้าแรก", map: "แผนที่" },
    cta: { explore: "สำรวจชมรม" },
    map: {
      pinType: {
        faculty: "คณะ",
        club: "ชมรม",
        shop: "ร้านค้า",
        facility: "สิ่งอำนวยความสะดวก",
        landmark: "สถานที่สำคัญ",
        service: "จุดบริการ",
        parking: "ที่จอดรถ",
        registration: "จุดลงทะเบียน",
        workshop: "เวิร์กช็อป",
        organization: "องค์กร",
        building: "อาคาร",
      },
      close: "ปิด",
      viewAllClubs: "ดูชมรมทั้งหมด",
    },
    explore: {
      hello: "สวัสดีน้องใหม่!",
      subtitle: "กลัวพลาดกิจกรรมดีๆ ? ติดตามกิจกรรม จากหลายชมรมในจุฬา",
      searchPlaceholder: "กำลังหาอะไรอยู่?",
    },
    clubCard: {
      thincCredit: "โปรเจกต์นี้จัดทำโดยชมรม Thinc.",
    },
    categories: {
      วิชาการ: "วิชาการ",
      "ศิลปะ & ดนตรี": "ศิลปะ & ดนตรี",
      กีฬา: "กีฬา",
      เทคโนโลยี: "เทคโนโลยี",
      "สังคม & จิตอาสา": "สังคม & จิตอาสา",
      สิ่งแวดล้อม: "สิ่งแวดล้อม",
      ธุรกิจ: "ธุรกิจ",
      ไลฟ์สไตล์: "ไลฟ์สไตล์",
      อื่นๆ: "อื่นๆ",
    },
  },
  en: {
    nav: { explore: "Explore", home: "Home", map: "Map" },
    cta: { explore: "Explore Clubs" },
    map: {
      pinType: {
        faculty: "Faculty",
        club: "Club",
        shop: "Shop",
        facility: "Facility",
        landmark: "Landmark",
        service: "Service Point",
        parking: "Parking",
        registration: "Registration",
        workshop: "Workshop",
        organization: "Organization",
        building: "Building",
      },
      close: "Close",
      viewAllClubs: "View All Clubs",
    },
    explore: {
      hello: "Hi there, freshies!",
      subtitle: "Don't miss out on great activities — follow clubs across Chula",
      searchPlaceholder: "What are you looking for?",
    },
    clubCard: {
      thincCredit: "This project is built by Thinc. club",
    },
    categories: {
      วิชาการ: "Academic",
      "ศิลปะ & ดนตรี": "Arts & Music",
      กีฬา: "Sports",
      เทคโนโลยี: "Technology",
      "สังคม & จิตอาสา": "Social & Volunteer",
      สิ่งแวดล้อม: "Environment",
      ธุรกิจ: "Business",
      ไลฟ์สไตล์: "Lifestyle",
      อื่นๆ: "Others",
    },
  },
} as const;

export function getCategoryLabel(category: string, language: Language): string {
  const dict = translations[language].categories as Record<string, string>;
  return dict[category] ?? category;
}
