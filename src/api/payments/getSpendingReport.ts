import { axiosInstance } from "@/api/axiosInstance";
import { ENDPOINTS } from "@/constants/endpoints";
import { ApiResponse } from "@/types/apiResponseTypes";
import { GetSpendingReportResult } from "@/types/payments/getSpendingReportTypes";

export async function getSpendingReport(
  date: string
): Promise<ApiResponse<GetSpendingReportResult | null>> {
  try {
    const response = await axiosInstance.post<
      ApiResponse<GetSpendingReportResult | null>
    >(ENDPOINTS.PAYMENT.REPORT, { date });
    return response.data;
  } catch (error) {
    const axiosError = error as {
      response?: { data: ApiResponse<GetSpendingReportResult | null> };
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
