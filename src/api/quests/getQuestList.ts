import { axiosInstance } from "@/api/axiosInstance";
import { ENDPOINTS } from "@/constants/endpoints";
import { ApiResponse } from "@/types/apiResponseTypes";
import { GetQuestListResult } from "@/types/quests/getQuestListTypes";

export async function getQuestList(): Promise<
  ApiResponse<GetQuestListResult[] | null>
> {
  try {
    const response = await axiosInstance.get<
      ApiResponse<GetQuestListResult[] | null>
    >(ENDPOINTS.QUESTS.GET_LIST);
    return response.data;
  } catch (error) {
    const axiosError = error as {
      response?: { data: ApiResponse<GetQuestListResult[] | null> };
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
