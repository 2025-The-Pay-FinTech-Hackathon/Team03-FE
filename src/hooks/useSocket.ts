import { useEffect, useRef } from "react";
import io from "socket.io-client";

// 전역 소켓 인스턴스 관리
let globalSocket: SocketIOClient.Socket | null = null;
let currentToken: string | null = null;
let reconnectAttempts = 0;
const MAX_RECONNECT_ATTEMPTS = 5;

export const disconnectSocket = () => {
  if (globalSocket) {
    globalSocket.disconnect();
    globalSocket = null;
    currentToken = null;
    reconnectAttempts = 0;
  }
};

export const useSocket = (token: string) => {
  const socketRef = useRef<SocketIOClient.Socket | null>(null);

  useEffect(() => {
    if (!token) return;

    // 이미 동일한 토큰으로 연결된 소켓이 있다면 재사용
    if (globalSocket?.connected && currentToken === token) {
      socketRef.current = globalSocket;
      return;
    }

    const connectSocket = () => {
      // 기존 소켓이 있다면 연결 해제
      if (globalSocket) {
        globalSocket.disconnect();
      }

      // 새로운 소켓 연결 생성
      currentToken = token;
      globalSocket = io(process.env.NEXT_PUBLIC_SOCKET_BASE_URL || "", {
        query: { token },
        transports: ["websocket"],
        reconnection: true,
        reconnectionAttempts: MAX_RECONNECT_ATTEMPTS,
        reconnectionDelay: 1000,
      });

      socketRef.current = globalSocket;

      globalSocket.on("connect", () => {
        console.log("✅ Socket connected:", globalSocket?.id);
        reconnectAttempts = 0;
      });

      globalSocket.on("disconnect", () => {
        console.log("❌ Socket disconnected");
      });

      globalSocket.on("connect_error", (err: Error) => {
        console.error("⚠️ Socket connection error:", err);
        reconnectAttempts++;

        if (reconnectAttempts >= MAX_RECONNECT_ATTEMPTS) {
          console.error("최대 재연결 시도 횟수를 초과했습니다.");
          disconnectSocket();
        }
      });
    };

    connectSocket();

    // cleanup 함수에서는 이벤트 리스너만 제거
    return () => {
      if (socketRef.current) {
        console.log("🔄 Socket disconnected");
        socketRef.current.off("connect");
        socketRef.current.off("disconnect");
        socketRef.current.off("connect_error");
      }
    };
  }, []); // 의존성 배열을 비워서 마운트 시에만 실행

  return socketRef.current;
};
