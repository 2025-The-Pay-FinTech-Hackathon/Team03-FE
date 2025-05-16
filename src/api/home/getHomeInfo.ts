import { axiosInstance } from "@/api/axiosInstance";
import { ENDPOINTS } from "@/constants/endpoints";
import { ApiResponse } from "@/types/apiResponseTypes";
import { GetHomeInfoResult } from "@/types/home/getHomeInfoTypes";

export async function getHomeInfo(): Promise<
  ApiResponse<GetHomeInfoResult | null>
> {
  try {
    const response = await axiosInstance.get<
      ApiResponse<GetHomeInfoResult | null>
    >(ENDPOINTS.HOME.GET);
    return response.data;
  } catch (error) {
    const axiosError = error as {
      response?: { data: ApiResponse<GetHomeInfoResult | null> };
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
