export interface ApprovePaymentRequest {
  reason: string;
  merchantName: string;
  amount: number;
  timestamp: string;
  status: "REQUEST" | "APPROVE" | "REFUSED";
}
