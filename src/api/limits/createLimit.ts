import { axiosInstance } from "@/api/axiosInstance";
import { ENDPOINTS } from "@/constants/endpoints";
import { ApiResponse } from "@/types/apiResponseTypes";
import { CreateLimitRequest } from "@/types/limits/createLimitTypes";

export async function createLimit({
  category,
  amountLimit,
  timeRange,
  location,
  dailyLimit,
}: CreateLimitRequest): Promise<ApiResponse<null>> {
  try {
    const response = await axiosInstance.post<ApiResponse<null>>(
      ENDPOINTS.LIMIT.CREATE,
      {
        category,
        amountLimit,
        timeRange,
        location,
        dailyLimit,
      }
    );
    return response.data;
  } catch (error) {
    const axiosError = error as {
      response?: { data: ApiResponse<null> };
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
