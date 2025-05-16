import { QUEST_CATEGORIES } from "@/constants/questCategory";
import TextButton from "@/components/Button/TextButton";
import Input from "@/components/Input";
import Dropdown from "@/components/Dropdown";

interface FormData {
  category: string;
  title: string;
  body: string;
  reward: number;
  deadline: string;
}

interface QuestFormProps {
  formData: FormData;
  isFormValid: boolean;
  onSubmit: () => void;
  onChange: (formData: FormData) => void;
}

export default function QuestForm({
  formData,
  isFormValid,
  onSubmit,
  onChange,
}: QuestFormProps) {
  return (
    <div className="flex flex-col gap-6">
      {/* 카테고리 선택 */}
      <div className="flex flex-col gap-2">
        <label className="text-sm text-[#1E1E1E]">카테고리</label>
        <Dropdown
          options={QUEST_CATEGORIES.map((cat) => ({
            label: cat.name,
            value: cat.key,
          }))}
          value={formData.category}
          onChange={(value) => onChange({ ...formData, category: value })}
        />
      </div>

      {/* 제목 입력 */}
      <div className="flex flex-col gap-2">
        <label className="text-sm text-[#1E1E1E]">제목</label>
        <Input
          type="text"
          value={formData.title}
          onChange={(e) => onChange({ ...formData, title: e.target.value })}
          placeholder="퀘스트 제목을 입력하세요"
        />
      </div>

      {/* 내용 입력 */}
      <div className="flex flex-col gap-2">
        <label className="text-sm text-[#1E1E1E]">내용</label>
        <Input
          type="textarea"
          value={formData.body}
          onChange={(e) => onChange({ ...formData, body: e.target.value })}
          placeholder="퀘스트 내용을 입력하세요"
        />
      </div>

      {/* 보상 입력 */}
      <div className="flex flex-col gap-2">
        <label className="text-sm text-[#1E1E1E]">보상 금액</label>
        <Input
          type="text"
          value={formData.reward ? String(formData.reward) : ""}
          onChange={(e) => {
            const value = e.target.value.replace(/[^0-9]/g, "");
            onChange({
              ...formData,
              reward: value ? Number(value) : 0,
            });
          }}
          placeholder="보상 금액을 입력하세요"
        />
      </div>

      {/* 마감일 선택 */}
      <div className="flex flex-col gap-2">
        <label className="text-sm text-[#1E1E1E]">마감일</label>
        <Input
          type="datetime-local"
          value={formData.deadline}
          onChange={(e) => onChange({ ...formData, deadline: e.target.value })}
        />
      </div>

      {/* 제출 버튼 */}
      <div className="mt-4">
        <TextButton onClick={onSubmit} width="full" disabled={!isFormValid}>
          퀘스트 생성하기
        </TextButton>
      </div>
    </div>
  );
}
