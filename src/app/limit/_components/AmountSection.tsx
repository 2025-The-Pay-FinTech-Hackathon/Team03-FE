import Input from "@/components/Input";
import { formatNumber } from "@/utils/formatters";

interface AmountSectionProps {
  amountLimit: number;
  dailyLimit: number;
  isReadOnly: boolean;
  onUpdate: (field: "amountLimit" | "dailyLimit", value: number) => void;
}

export function AmountSection({
  amountLimit,
  dailyLimit,
  isReadOnly,
  onUpdate,
}: AmountSectionProps) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold">결제 금액 제한</h2>
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <span className="whitespace-nowrap">1회당 최대</span>
          <Input
            type="text"
            value={amountLimit ? formatNumber(amountLimit) : ""}
            onChange={(e) => {
              const value = e.target.value.replace(/[^0-9]/g, "");
              onUpdate("amountLimit", value ? Number(value) : 0);
            }}
            disabled={isReadOnly}
            placeholder="금액을 입력하세요"
            className="max-w-full"
          />
          <span className="whitespace-nowrap">원</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="whitespace-nowrap">하루에 최대</span>
          <Input
            type="text"
            value={dailyLimit ? formatNumber(dailyLimit) : ""}
            onChange={(e) => {
              const value = e.target.value.replace(/[^0-9]/g, "");
              onUpdate("dailyLimit", value ? Number(value) : 0);
            }}
            disabled={isReadOnly}
            placeholder="금액을 입력하세요"
            className="max-w-full"
          />
          <span className="whitespace-nowrap">원</span>
        </div>
      </div>
    </div>
  );
}
