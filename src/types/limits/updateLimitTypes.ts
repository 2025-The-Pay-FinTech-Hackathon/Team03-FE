import { LIMIT_CATEGORIES } from "@/constants/limitCategory";

type CategoryType = (typeof LIMIT_CATEGORIES)[number]["key"];

export interface UpdateLimitRequest {
  category?: CategoryType[];
  amountLimit?: number;
  timeRange?: [string, string];
  location?: {
    lat: number;
    lng: number;
    radius: number;
  }[];
  dailyLimit?: number;
}

export interface UpdateLimitResult {
  category?: CategoryType[];
  amountLimit?: number;
  timeRange?: [string, string];
  location?: {
    lat: number;
    lng: number;
    radius: number;
  }[];
  dailyLimit?: number;
}
