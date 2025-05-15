export const ROUTES = {
  login: "/login", // 로그인
  signup: "/signup", // 회원가입
  onBoarding: "/onboarding", // 온보딩
  home: "/", // 홈 화면
  quest: "/quest", // 퀘스트페이지
  questDetail: (questId: string) => `/quest/${questId}`, // 퀘스트 상세페이지
  limit: "/limit", // 소비제한 페이지
  report: "/report", // 소비리포트 페이지
  setting: "/setting", // 설정 페이지
  requestOneTimePayment: "/request-one-time-payment", // 일회성 결제 요청 페이지
  profileSetting: "/setting/profile", // 프로필 설정 페이지
  accountSetting: "/setting/account", // 계좌 설정 페이지
  allowanceScheduleSetting: "/setting/allowance-schedule", // 지출 일정 설정 페이지
};
