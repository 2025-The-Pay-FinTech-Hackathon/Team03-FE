import { useAuthStore } from "@/store/useAuthStore";

interface DecodedToken {
  id: number;
  role: "PARENT" | "CHILD";
}

export const initializeAuth = () => {
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) return null;

    // JWT 토큰의 payload 부분(두 번째 부분)을 디코드
    const payload = token.split(".")[1];
    const decodedPayload = JSON.parse(atob(payload)) as DecodedToken;

    // role을 스토어에 저장
    const setRole = useAuthStore.getState().setRole;
    setRole(decodedPayload.role);

    console.log("role", decodedPayload.role);

    return decodedPayload;
  } catch (error) {
    console.error("토큰 디코딩 중 에러 발생:", error);
    return null;
  }
};
