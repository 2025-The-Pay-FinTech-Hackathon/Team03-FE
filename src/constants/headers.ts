import { ROUTES } from "./routes";

export type HeaderType = "none" | "BackWithTitleHeader" | "TitleHeader";

type RouteHeaderConfig = {
  [key: string]: {
    type: HeaderType;
    title?: string;
  };
};

export const ROUTE_HEADERS: RouteHeaderConfig = {
  [ROUTES.login]: {
    type: "none",
  },
  [ROUTES.signup]: {
    type: "BackWithTitleHeader",
    title: "회원가입",
  },
  [ROUTES.onBoarding]: {
    type: "none",
  },
  [ROUTES.home]: {
    type: "TitleHeader",
    title: "홈",
  },
  [ROUTES.quest]: {
    type: "BackWithTitleHeader",
    title: "퀘스트",
  },
  [ROUTES.createQuest]: {
    type: "BackWithTitleHeader",
    title: "퀘스트 생성",
  },
  // questDetail은 동적 라우트이므로 별도 처리 필요
  "/quest/[questId]": {
    type: "BackWithTitleHeader",
    title: "퀘스트 상세",
  },
  [ROUTES.limit]: {
    type: "BackWithTitleHeader",
    title: "소비 제한",
  },
  [ROUTES.report]: {
    type: "BackWithTitleHeader",
    title: "소비 리포트",
  },
  [ROUTES.setting]: {
    type: "BackWithTitleHeader",
    title: "설정",
  },
  [ROUTES.requestOneTimePayment]: {
    type: "BackWithTitleHeader",
    title: "일회성 결제 요청",
  },
  [ROUTES.profileSetting]: {
    type: "BackWithTitleHeader",
    title: "프로필 설정",
  },
  [ROUTES.accountSetting]: {
    type: "BackWithTitleHeader",
    title: "계좌 설정",
  },
  [ROUTES.allowanceScheduleSetting]: {
    type: "BackWithTitleHeader",
    title: "지출 일정 설정",
  },
};

// 현재 경로에 맞는 헤더 설정을 가져오는 유틸리티 함수
export const getHeaderConfig = (path: string) => {
  // 동적 라우트 처리
  if (path.startsWith("/quest/") && path !== "/quest/create") {
    return ROUTE_HEADERS["/quest/[questId]"];
  }

  return ROUTE_HEADERS[path] || { type: "none" };
};
