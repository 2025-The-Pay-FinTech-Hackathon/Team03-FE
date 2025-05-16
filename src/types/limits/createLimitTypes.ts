import { LIMIT_CATEGORIES } from "@/constants/limitCategory";

type CategoryType = (typeof LIMIT_CATEGORIES)[number]["key"];

export interface CreateLimitRequest {
  category?: CategoryType[];
  amountLimit?: number;
  timeRange?: [string, string]; // 결제 가능한 시간 범위
  location?: {
    lat: number;
    lng: number;
    radius: number;
  }[];
  dailyLimit?: number;
}
