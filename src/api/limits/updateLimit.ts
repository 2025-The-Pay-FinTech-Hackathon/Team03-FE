import { axiosInstance } from "@/api/axiosInstance";
import { ENDPOINTS } from "@/constants/endpoints";
import { ApiResponse } from "@/types/apiResponseTypes";
import {
  UpdateLimitRequest,
  UpdateLimitResult,
} from "@/types/limits/updateLimitTypes";

export async function updateLimit({
  category,
  amountLimit,
  timeRange,
  location,
  dailyLimit,
}: UpdateLimitRequest): Promise<ApiResponse<UpdateLimitResult | null>> {
  try {
    const response = await axiosInstance.put<
      ApiResponse<UpdateLimitResult | null>
    >(ENDPOINTS.LIMIT.UPDATE, {
      category,
      amountLimit,
      timeRange,
      location,
      dailyLimit,
    });
    return response.data;
  } catch (error) {
    const axiosError = error as {
      response?: { data: ApiResponse<UpdateLimitResult | null> };
    };
    if (axiosError.response?.data) {
      return axiosError.response.data;
    }
    return {
      isSuccess: false,
      code: "UNKNOWN_ERROR",
      message: "알 수 없는 오류가 발생했습니다.",
    };
  }
}
