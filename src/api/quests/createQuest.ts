import { axiosInstance } from "@/api/axiosInstance";
import { ENDPOINTS } from "@/constants/endpoints";
import { ApiResponse } from "@/types/apiResponseTypes";
import {
  CreateQuestRequest,
  CreateQuestResult,
} from "@/types/quests/createQuestTypes";

export async function createQuest({
  category,
  title,
  body,
  reward,
  deadline,
}: CreateQuestRequest): Promise<ApiResponse<CreateQuestResult | null>> {
  try {
    const response = await axiosInstance.post<
      ApiResponse<CreateQuestResult | null>
    >(ENDPOINTS.QUESTS.CREATE, {
      category,
      title,
      body,
      reward,
      deadline,
    });
    return response.data;
  } catch (error) {
    const axiosError = error as {
      response?: { data: ApiResponse<CreateQuestResult | null> };
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
