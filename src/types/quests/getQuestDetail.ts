import { QUEST_CATEGORIES } from "@/constants/questCategory";

type CategoryType = (typeof QUEST_CATEGORIES)[number]["key"];

export type GetQuestDetailResult = {
  questId: string;
  category: CategoryType;
  title: string;
  body: string;
  reward: number;
  createdAt: string;
  deadline: string;
  status: "CHALLENGING" | "SUCCESS" | "END";
};
