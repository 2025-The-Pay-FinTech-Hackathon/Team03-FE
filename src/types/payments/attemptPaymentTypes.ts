export interface AttemptPaymentRequest {
  reason: string;
  merchantName: string;
  mccCode: number;
  amount: number;
  timestamp: string;
  userId: number;
  status: "REQUEST" | "APPROVED" | "REJECTED";
}
