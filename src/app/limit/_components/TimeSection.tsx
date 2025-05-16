import Input from "@/components/Input";
import { formatTime, validateTime } from "@/utils/formatters";

interface TimeSectionProps {
  startTime: string;
  endTime: string;
  isReadOnly: boolean;
  onUpdate: (field: "startTime" | "endTime", value: string) => void;
}

export function TimeSection({
  startTime,
  endTime,
  isReadOnly,
  onUpdate,
}: TimeSectionProps) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold">결제 허용 시간</h2>
      {!isReadOnly && (
        <p className="text-xs text-gray-500">
          24시간 형식으로 입력해주세요. (예: 09:00, 17:30)
        </p>
      )}

      <div className="flex items-center gap-2">
        <Input
          type="text"
          value={startTime}
          onChange={(e) => {
            const value = e.target.value;
            if (!validateTime(value)) return;
            onUpdate("startTime", formatTime(value));
          }}
          disabled={isReadOnly}
          placeholder="00:00"
          className="max-w-full text-center"
          maxLength={5}
        />
        <span className="whitespace-nowrap">부터</span>
        <Input
          type="text"
          value={endTime}
          onChange={(e) => {
            const value = e.target.value;
            if (!validateTime(value)) return;
            onUpdate("endTime", formatTime(value));
          }}
          disabled={isReadOnly}
          placeholder="00:00"
          className="max-w-full text-center"
          maxLength={5}
        />
        <span className="whitespace-nowrap">까지 허용</span>
      </div>
    </div>
  );
}
