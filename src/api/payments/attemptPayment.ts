import { axiosInstance } from "@/api/axiosInstance";
import { ENDPOINTS } from "@/constants/endpoints";
import { ApiResponse } from "@/types/apiResponseTypes";
import { AttemptPaymentRequest } from "@/types/payments/attemptPaymentTypes";

export async function attemptPayment({
  reason,
  merchantName,
  mccCode,
  amount,
  timestamp,
  userId,
  status,
}: AttemptPaymentRequest): Promise<ApiResponse<null>> {
  try {
    const response = await axiosInstance.post<ApiResponse<null>>(
      ENDPOINTS.PAYMENT.ATTEMPT,
      { reason, merchantName, mccCode, amount, timestamp, userId, status }
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
