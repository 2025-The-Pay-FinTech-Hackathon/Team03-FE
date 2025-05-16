import { axiosInstance } from "@/api/axiosInstance";
import { ENDPOINTS } from "@/constants/endpoints";
import { ApiResponse } from "@/types/apiResponseTypes";

export async function completeQuest(
  questId: string
): Promise<ApiResponse<null>> {
  try {
    const response = await axiosInstance.patch<ApiResponse<null>>(
      `${ENDPOINTS.QUESTS.COMPLETE(questId)}`
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
