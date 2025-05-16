import { useEffect, useState } from "react";
import { useSocket } from "@/hooks/useSocket";
import AlertModal from "../Modal/AlertModal";

interface AskResultNotificationProps {
  token: string;
}

export const AskResultNotification = ({
  token,
}: AskResultNotificationProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [status, setStatus] = useState<"APPROVE" | "REFUSED">();
  const socket = useSocket(token);

  useEffect(() => {
    if (!socket) return;

    // 퀘스트 이벤트 수신 시 상태 업데이트 및 모달 열기
    socket.on("ask-result", (status: "APPROVE" | "REFUSED") => {
      console.log("📬 응답 결과 수신:", status);
      setStatus(status);
      setIsModalOpen(true);
    });

    return () => {
      socket.off("ask-result");
    };
  }, [socket]);

  // 모달 상태 변경 모니터링
  useEffect(() => {}, [isModalOpen]);

  const handleConfirm = async () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {status && (
        <AlertModal
          isOpen={isModalOpen}
          onClose={handleConfirm}
          onConfirm={handleConfirm}
          confirmText="수락"
        >
          <div className="text-center">
            {status === "APPROVE" ? "결제 승인" : "결제 거절"}
          </div>
        </AlertModal>
      )}
    </>
  );
};
