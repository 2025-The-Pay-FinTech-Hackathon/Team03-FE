import { axiosInstance } from "@/api/axiosInstance";
import { ENDPOINTS } from "@/constants/endpoints";
import { ApiResponse } from "@/types/apiResponseTypes";
import { GetSpendingListResult } from "@/types/payments/getSpendingListTypes";

export async function getSpendingList(): Promise<
  ApiResponse<GetSpendingListResult[] | null>
> {
  try {
    const response = await axiosInstance.get<
      ApiResponse<GetSpendingListResult[] | null>
    >(ENDPOINTS.PAYMENT.SPENDING);
    return response.data;
  } catch (error) {
    const axiosError = error as {
      response?: { data: ApiResponse<GetSpendingListResult[] | null> };
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
