"use client";

import { useState } from "react";
import { format, addMonths, subMonths, isSameMonth } from "date-fns";
import { ko } from "date-fns/locale";
import { ChevronLeft, ChevronRight } from "lucide-react";
import VerticalActionButton from "@/components/Button/VerticalActionButton";

interface DateSelectorProps {
  onDateChange: (date: string) => void;
}

export default function DateSelector({ onDateChange }: DateSelectorProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const today = new Date();
  const isCurrentMonth = isSameMonth(currentDate, today);

  const handlePrevMonth = () => {
    const newDate = subMonths(currentDate, 1);
    setCurrentDate(newDate);
    onDateChange(format(newDate, "yyyy-MM"));
  };

  const handleNextMonth = () => {
    if (isCurrentMonth) return;
    const newDate = addMonths(currentDate, 1);
    setCurrentDate(newDate);
    onDateChange(format(newDate, "yyyy-MM"));
  };

  return (
    <div className="flex items-center justify-center gap-4">
      <div>
        <VerticalActionButton onClick={handlePrevMonth}>
          <ChevronLeft className="h-4 w-4" />
        </VerticalActionButton>
      </div>
      <div className="w-content text-center">
        <span className="text-lg font-semibold">
          {format(currentDate, "yyyy년 M월", { locale: ko })}
        </span>
      </div>

      <div className={isCurrentMonth ? "invisible" : ""}>
        <VerticalActionButton onClick={handleNextMonth}>
          <ChevronRight className="h-4 w-4" />
        </VerticalActionButton>
      </div>
    </div>
  );
}
