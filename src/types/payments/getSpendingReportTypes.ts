export interface GetSpendingReportResult {
  summary: string;
  shopping: number;
  food: number;
  culture: number;
  etc: number;
  spending: { date: string; merchant: string; amount: number }[];
}
