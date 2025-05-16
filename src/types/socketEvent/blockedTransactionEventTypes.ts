export type BlockedTransactionEventResponse = {
  reason: string; // 제한 이유
  merchantName: string; // 상점 이름
  mccCode: number; // 상점 코드
  amount: number; // 거래 금액
  timestamp: string; // 거래 시간
  userId: number; // 사용자 아이디
};
