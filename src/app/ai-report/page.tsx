"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { getSpendingReport } from "@/api/payments/getSpendingReport";
import DateSelector from "./_components/DateSelector";
import SpendingChart from "./_components/SpendingChart";
import SpendingList from "./_components/SpendingList";

export default function AIReportPage() {
  const [date, setDate] = useState(format(new Date(), "yyyy-MM"));
  const [reportData, setReportData] = useState<{
    summary: string;
    shopping: number;
    food: number;
    culture: number;
    etc: number;
    spending: Array<{
      timestamp: string;
      merchantName: string;
      amount: number;
    }>;
  } | null>(null);

  const fetchReport = async (selectedDate: string) => {
    try {
      const response = await getSpendingReport(selectedDate);
      if (response.isSuccess && response.result) {
        setReportData(response.result);
      }
    } catch (error) {
      console.error("소비 리포트 조회 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    fetchReport(date);
  }, [date]);

  if (!reportData) {
    return <div className="p-4">로딩중...</div>;
  }

  return (
    <div className="p-6 flex flex-col gap-8">
      <DateSelector onDateChange={setDate} />

      <div className="bg-white rounded-xl p-4">
        <h2 className="text-lg font-semibold mb-4">
          AI가 요약해주는 이번달 소비 리포트
        </h2>

        <p className="text-gray-700">{reportData.summary}</p>
      </div>

      <SpendingChart
        shopping={reportData.shopping}
        food={reportData.food}
        culture={reportData.culture}
        etc={reportData.etc}
      />

      <SpendingList spending={reportData.spending} />
    </div>
  );
}
