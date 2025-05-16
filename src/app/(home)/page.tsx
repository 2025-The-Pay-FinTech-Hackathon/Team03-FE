"use client";

import { useState } from "react";
import TextButton from "@/components/Button/TextButton";
import VerticalActionButton from "@/components/Button/VerticalActionButton";
import AlertModal from "@/components/Modal/AlertModal";
import ClosableModal from "@/components/Modal/ClosableModal";
import ConfirmModal from "@/components/Modal/ConfirmModal";
import Dropdown from "@/components/Dropdown";
import Input from "@/components/Input";
import { Heart } from "lucide-react";

export default function Home() {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isClosableOpen, setIsClosableOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [textareaValue, setTextareaValue] = useState("");
  const [dateValue, setDateValue] = useState("");
  const [dropdownValue, setDropdownValue] = useState("");

  const dropdownOptions = [
    { label: "옵션 1", value: "1" },
    { label: "옵션 2", value: "2" },
    { label: "옵션 3", value: "3" },
  ];

  return (
    <main className="p-4 flex flex-col gap-8">
      <section className="space-y-4">
        <h2 className="text-xl font-bold">버튼 테스트</h2>
        <div className="space-y-2">
          <TextButton onClick={() => console.log("기본 버튼 클릭")}>
            기본 버튼
          </TextButton>
          <TextButton
            onClick={() => console.log("Secondary 버튼 클릭")}
            variant="secondary"
          >
            Secondary 버튼
          </TextButton>
          <TextButton
            onClick={() => console.log("Disabled 버튼 클릭")}
            disabled
          >
            비활성화 버튼
          </TextButton>
          <div className="flex justify-center">
            <VerticalActionButton
              onClick={() => console.log("아이콘 버튼 클릭")}
            >
              <Heart className="w-6 h-6" />
            </VerticalActionButton>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold">모달 테스트</h2>
        <div className="space-y-2">
          <TextButton onClick={() => setIsAlertOpen(true)}>
            Alert 모달 열기
          </TextButton>
          <TextButton onClick={() => setIsClosableOpen(true)}>
            Closable 모달 열기
          </TextButton>
          <TextButton onClick={() => setIsConfirmOpen(true)}>
            Confirm 모달 열기
          </TextButton>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold">입력 필드 테스트</h2>
        <div className="space-y-4">
          <Input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="텍스트를 입력하세요"
          />
          <Input
            type="textarea"
            value={textareaValue}
            onChange={(e) => setTextareaValue(e.target.value)}
            placeholder="여러 줄의 텍스트를 입력하세요"
          />
          <Input
            type="datetime-local"
            value={dateValue}
            onChange={(e) => setDateValue(e.target.value)}
          />
          <Dropdown
            options={dropdownOptions}
            value={dropdownValue}
            onChange={setDropdownValue}
            placeholder="드롭다운 옵션을 선택하세요"
          />
        </div>
      </section>

      <AlertModal
        isOpen={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
        onConfirm={() => console.log("Alert 확인")}
      >
        <p className="text-center">이것은 Alert 모달입니다.</p>
      </AlertModal>

      <ClosableModal
        isOpen={isClosableOpen}
        onClose={() => setIsClosableOpen(false)}
      >
        <div className="p-4">
          <h3 className="text-lg font-bold mb-4">Closable 모달</h3>
          <p>이것은 닫기 버튼이 있는 모달입니다.</p>
        </div>
      </ClosableModal>

      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={() => console.log("Confirm 확인")}
        confirmText="확인"
        cancelText="취소"
      >
        <p className="text-center">정말 이 작업을 수행하시겠습니까?</p>
      </ConfirmModal>
    </main>
  );
}
