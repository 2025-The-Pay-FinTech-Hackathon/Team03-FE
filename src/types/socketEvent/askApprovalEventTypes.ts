export type AskApprovalEventTypesResponse = {
  reason: string; // 제한 이유
  merchantName: string; // 상점 이름
  amount: number; // 거래 금액
  timestamp: string; // 거래 시간
};
