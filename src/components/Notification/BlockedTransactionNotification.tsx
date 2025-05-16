import { useEffect, useState } from "react";
import { useSocket } from "@/hooks/useSocket";
import AlertModal from "@/components/Modal/AlertModal";
import { BlockedTransactionEventResponse } from "@/types/socketEvent/blockedTransactionEventTypes";
import { useAuthStore } from "@/store/useAuthStore";
import ConfirmModal from "../Modal/ConfirmModal";
import { attemptPayment } from "@/api/payments/attemptPayment";
import { Siren } from "lucide-react";

const formatDateTime = (timestamp: string) => {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}`;
};

interface BlockedTransactionNotificationProps {
  token: string;
}

export const BlockedTransactionNotification = ({
  token,
}: BlockedTransactionNotificationProps) => {
  const [isParentModalOpen, setIsParentModalOpen] = useState(false);
  const [isChildModalOpen, setIsChildModalOpen] = useState(false);
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);
  const [resultMessage, setResultMessage] = useState("");
  const { role } = useAuthStore();

  const [blockedTransaction, setBlockedTransaction] =
    useState<BlockedTransactionEventResponse>();
  const socket = useSocket(token);

  useEffect(() => {
    if (!socket) return;

    // 퀘스트 이벤트 수신 시 상태 업데이트 및 모달 열기
    socket.on(
      "transaction-blocked",
      (blockedTransaction: BlockedTransactionEventResponse) => {
        console.log("📬 새로운 제한결제 수신:", blockedTransaction);
        setBlockedTransaction(blockedTransaction);
        if (role === "PARENT") {
          setIsParentModalOpen(true);
        } else {
          setIsChildModalOpen(true);
        }
      }
    );

    return () => {
      socket.off("transaction-blocked");
    };
  }, [socket, role]);

  // 모달 상태 변경 모니터링
  useEffect(() => {}, [isParentModalOpen, isChildModalOpen]);

  const handleConfirm = async () => {
    if (role === "PARENT") {
      setIsParentModalOpen(false);
    } else {
      setIsChildModalOpen(false);
      if (
        blockedTransaction?.reason &&
        blockedTransaction.merchantName &&
        blockedTransaction.amount &&
        blockedTransaction.mccCode &&
        blockedTransaction.timestamp &&
        blockedTransaction.userId
      ) {
        const result = await attemptPayment({
          reason: blockedTransaction.reason,
          merchantName: blockedTransaction.merchantName,
          amount: blockedTransaction.amount,
          mccCode: blockedTransaction.mccCode,
          timestamp: blockedTransaction.timestamp,
          userId: blockedTransaction.userId,
          status: "REQUEST",
        });

        setResultMessage(result.message || "요청이 처리되었습니다.");
        setIsResultModalOpen(true);
      }
    }
  };

  const handleResultConfirm = () => {
    setIsResultModalOpen(false);
  };

  return (
    <>
      {blockedTransaction && role === "PARENT" && (
        <AlertModal
          isOpen={isParentModalOpen}
          onClose={() => setIsParentModalOpen(false)}
          onConfirm={handleConfirm}
          confirmText="확인"
        >
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-8 text-red-500 flex items-center justify-center gap-2">
              <Siren className="w-8 h-8" />
              제한된 결제 알림
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
          </div>
        </AlertModal>
      )}
      {blockedTransaction && role === "CHILD" && (
        <ConfirmModal
          isOpen={isChildModalOpen}
          onClose={() => setIsChildModalOpen(false)}
          onConfirm={handleConfirm}
          confirmText="해제 요청"
          cancelText="취소"
        >
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-8 text-red-500 flex items-center justify-center gap-2">
              <Siren className="w-8 h-8" />
              결제가 제한되었습니다
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
              부모님께 이 결제를 한 번만 허락해 달라고 요청할까요?
            </p>
          </div>
        </ConfirmModal>
      )}
      <AlertModal
        isOpen={isResultModalOpen}
        onClose={() => setIsResultModalOpen(false)}
        onConfirm={handleResultConfirm}
        confirmText="확인"
      >
        <div className="text-center">
          <h2 className="text-xl font-bold mb-4">처리 결과</h2>
          <div className="p-4 rounded-lg">
            <p className="text-gray-800">{resultMessage}</p>
          </div>
        </div>
      </AlertModal>
    </>
  );
};
