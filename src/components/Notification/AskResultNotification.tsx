import { useEffect, useState } from "react";
import AlertModal from "../Modal/AlertModal";
import { useSocketContext } from "@/contexts/SocketContext";

export const AskResultNotification = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { socket } = useSocketContext();

  const [newStatus, setNewStatus] = useState<"APPROVE" | "REFUSED">();

  useEffect(() => {
    if (!socket) return;

    const handleAskResult = (status: "APPROVE" | "REFUSED") => {
      console.log("📬 응답 결과 수신:", status);
      setNewStatus(status);
      setIsModalOpen(true);
    };

    // 이벤트 리스너 등록
    socket.on("ask-result", handleAskResult);

    // cleanup 함수
    return () => {
      socket.off("ask-result", handleAskResult);
    };
  }, [socket]);

  // 모달 상태 변경 모니터링
  useEffect(() => {}, [isModalOpen]);

  const handleConfirm = async () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {newStatus && (
        <AlertModal
          isOpen={isModalOpen}
          onClose={handleConfirm}
          onConfirm={handleConfirm}
          confirmText="확인"
        >
          <div className="text-center">
            {newStatus === "REFUSED"
              ? "결제가 거절되었습니다."
              : "결제가 승인되었습니다."}
          </div>
        </AlertModal>
      )}
    </>
  );
};
