const BASE_API = "/api";

export const ENDPOINTS = {
  // 사용자 관련
  USER: {
    LOGIN: `${BASE_API}/users/kakao`,
    SIGNUP: `${BASE_API}/users/signup`,
    PROFILE: `${BASE_API}/users/profile`,
    ACCOUNT: `${BASE_API}/users/account`,
    ALLOWANCE_SCHEDULE: `${BASE_API}/users/allowance-schedule`,
  },

  // 홈 관련
  HOME: {
    GET: `${BASE_API}/home`,
  },

  // 퀘스트 관련
  QUESTS: {
    CREATE: `${BASE_API}/quests/create`,
    END: (questId: string) => `${BASE_API}/quests/${questId}/end`,
    DELETE: (questId: string) => `${BASE_API}/quests/${questId}/delete`,
    COMPLETE: (questId: string) => `${BASE_API}/quests/${questId}/complete`,
    GET_LIST: `${BASE_API}/quests`,
    GET_DETAIL: (questId: string) => `${BASE_API}/quests/${questId}`,
  },

  // 소비 제한 관련
  LIMIT: {
    CREATE: `${BASE_API}/limits/create`,
    UPDATE: `${BASE_API}/limits/change`,
    GET: `${BASE_API}/limits`,
  },

  // 아이 소비 리포트 관련
  REPORT: {
    GET: `${BASE_API}/children/spending`,
  },
};
