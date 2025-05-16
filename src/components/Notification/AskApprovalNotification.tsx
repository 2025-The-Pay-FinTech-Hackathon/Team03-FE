import { useEffect, useState } from "react";
import { useSocket } from "@/hooks/useSocket";
import ConfirmModal from "../Modal/ConfirmModal";
import { Bell } from "lucide-react";
import { formatDateTime } from "@/utils/formatters";
import { approvePayment } from "@/api/payments/approvePayment";
import { AskApprovalEventTypesResponse } from "@/types/socketEvent/askApprovalEventTypes";

interface AskApprovalNotificationProps {
  token: string;
}

export const AskApprovalNotification = ({
  token,
}: AskApprovalNotificationProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [blockedTransaction, setBlockedTransaction] =
    useState<AskApprovalEventTypesResponse>();
  const socket = useSocket(token);

  useEffect(() => {
    if (!socket) return;

    // 퀘스트 이벤트 수신 시 상태 업데이트 및 모달 열기
    socket.on(
      "ask-approval",
      (blockedTransaction: AskApprovalEventTypesResponse) => {
        console.log("📬 새로운 제한 결제 요청:", blockedTransaction);
        setBlockedTransaction(blockedTransaction);
        setIsModalOpen(true);
      }
    );

    return () => {
      socket.off("ask-approval");
    };
  }, [socket]);

  // 모달 상태 변경 모니터링
  useEffect(() => {}, [isModalOpen]);

  const handleConfirm = async () => {
    if (blockedTransaction) {
      await approvePayment({
        ...blockedTransaction,
        status: "APPROVE",
      });
    }
    setIsModalOpen(false);
  };

  const handleCanel = async () => {
    if (blockedTransaction) {
      await approvePayment({
        ...blockedTransaction,
        status: "REFUSED",
      });
    }
    setIsModalOpen(false);
  };

  return (
    <>
      {blockedTransaction && (
        <ConfirmModal
          isOpen={isModalOpen}
          onClose={handleCanel}
          onConfirm={handleConfirm}
          confirmText="수락"
          cancelText="거절"
        >
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-8 flex items-center justify-center gap-2">
              <Bell className="w-8 h-8" />
              결제 제한 해지 요청
            </h2>
            <div className="bg-gray-50 p-6 rounded-lg shadow-inner space-y-4">
              <div className="flex items-center justify-between border-b pb-3">
                <span className="text-gray-600 font-medium">제한 이유</span>
                <span className="text-red-500 font-semibold">
                  {blockedTransaction.reason}
                </span>
              </div>
              <div className="flex items-center justify-between border-b pb-3">
                <span className="text-gray-600 font-medium">결제 장소</span>
                <span className="font-semibold">
                  {blockedTransaction.merchantName}
                </span>
              </div>
              <div className="flex items-center justify-between border-b pb-3">
                <span className="text-gray-600 font-medium">결제 금액</span>
                <span className="text-blue-600 font-bold">
                  {blockedTransaction.amount.toLocaleString()}원
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 font-medium">시도 시각</span>
                <span className="text-gray-800">
                  {formatDateTime(blockedTransaction.timestamp)}
                </span>
              </div>
            </div>
            <p className="mt-6 text-gray-600 text-sm">
              해당 차단 내역과 동일한 결제를 허락해 주시겠습니까?
            </p>
          </div>
        </ConfirmModal>
      )}
    </>
  );
};
