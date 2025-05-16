import { useEffect, useRef } from "react";
import io from "socket.io-client";

export const useSocket = (token: string) => {
  const socketRef = useRef<SocketIOClient.Socket | null>(null);

  useEffect(() => {
    if (!token) return;

    // 소켓 연결
    socketRef.current = io("http://localhost:9092", {
      query: { token },
      transports: ["websocket"],
      forceNew: true,
    });

    // 연결 이벤트 리스너
    socketRef.current.on("connect", () => {
      console.log("✅ Socket connected:", socketRef.current?.id);
    });

    // 연결 해제 이벤트 리스너
    socketRef.current.on("disconnect", () => {
      console.log("❌ Socket disconnected");
    });

    // 에러 이벤트 리스너
    socketRef.current.on("connect_error", (err: Error) => {
      console.error("⚠️ Socket connection error:", err);
    });

    // 컴포넌트 언마운트 시 소켓 연결 해제
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [token]);

  return socketRef.current;
};
