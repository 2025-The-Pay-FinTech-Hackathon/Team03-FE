"use client";

import { formatDateTime } from "@/utils/formatters";

interface SpendingListProps {
  spending: Array<{
    timestamp: string;
    merchantName: string;
    amount: number;
  }>;
}

export default function SpendingList({ spending }: SpendingListProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">소비 내역</h2>
      <div className="space-y-2">
        {spending.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-4 bg-white rounded-lg"
          >
            <div>
              <div className="font-medium">{item.merchantName}</div>
              <div className="text-sm text-gray-500">
                {formatDateTime(item.timestamp)}
              </div>
            </div>
            <div
              className={`font-semibold ${
                item.amount > 0 ? "text-blue-500" : "text-red-500"
              }`}
            >
              {item.amount > 0 ? "+" : ""}
              {item.amount.toLocaleString()}원
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
