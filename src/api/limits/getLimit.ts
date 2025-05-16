import { axiosInstance } from "@/api/axiosInstance";
import { ENDPOINTS } from "@/constants/endpoints";
import { ApiResponse } from "@/types/apiResponseTypes";
import { GetQuestDetailResult } from "@/types/quests/getQuestDetail";

export async function getLimit(): Promise<
  ApiResponse<GetQuestDetailResult | null>
> {
  try {
    const response = await axiosInstance.get<
      ApiResponse<GetQuestDetailResult | null>
    >(ENDPOINTS.LIMIT.GET);
    return response.data;
  } catch (error) {
    const axiosError = error as {
      response?: { data: ApiResponse<GetQuestDetailResult | null> };
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
