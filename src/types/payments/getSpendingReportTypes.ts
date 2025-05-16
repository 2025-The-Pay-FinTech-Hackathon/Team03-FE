export interface GetSpendingReportResult {
  summary: string;
  shopping: number;
  food: number;
  culture: number;
  etc: number;
  spending: { timestamp: string; merchantName: string; amount: number }[];
}
