import { axiosInstance } from "@/api/axiosInstance";
import { ENDPOINTS } from "@/constants/endpoints";
import { ApiResponse } from "@/types/apiResponseTypes";
import { GetQuestDetailResult } from "@/types/quests/getQuestDetail";

export async function getQuestDetail(
  questId: string
): Promise<ApiResponse<GetQuestDetailResult>> {
  try {
    const response = await axiosInstance.get<ApiResponse<GetQuestDetailResult>>(
      `${ENDPOINTS.QUESTS.GET_DETAIL(questId)}`
    );
    return response.data;
  } catch (error) {
    const axiosError = error as {
      response?: { data: ApiResponse<GetQuestDetailResult> };
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
