import React, { createContext, useContext, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";

interface SocketContextType {
  socket: typeof Socket | null;
}

const SocketContext = createContext<SocketContextType>({ socket: null });

// 전역 소켓 인스턴스 관리
let globalSocket: typeof Socket | null = null;
let reconnectAttempts = 0;
const MAX_RECONNECT_ATTEMPTS = 5;

export const SocketProvider = ({
  children,
  token,
}: {
  children: React.ReactNode;
  token: string;
}) => {
  const [socket, setSocket] = useState<typeof Socket | null>(null);

  useEffect(() => {
    if (!token) return;

    const connectSocket = () => {
      if (globalSocket?.connected) {
        setSocket(globalSocket);
        return;
      }

      if (globalSocket) {
        globalSocket.disconnect();
      }

      globalSocket = io(process.env.NEXT_PUBLIC_SOCKET_BASE_URL || "", {
        query: { token },
        transports: ["websocket"],
        reconnection: true,
        reconnectionAttempts: MAX_RECONNECT_ATTEMPTS,
        reconnectionDelay: 1000,
      });

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

      setSocket(globalSocket);
    };

    connectSocket();

    return () => {
      // cleanup은 앱이 완전히 종료될 때만 수행
      if (globalSocket) {
        globalSocket.off("connect");
        globalSocket.off("disconnect");
        globalSocket.off("connect_error");
      }
    };
  }, [token]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocketContext = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocketContext must be used within a SocketProvider");
  }
  return context;
};

export const disconnectSocket = () => {
  if (globalSocket) {
    globalSocket.disconnect();
    globalSocket = null;
    reconnectAttempts = 0;
  }
};
