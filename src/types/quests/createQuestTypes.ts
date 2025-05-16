import { QUEST_CATEGORIES } from "@/constants/questCategory";

type CategoryType = (typeof QUEST_CATEGORIES)[number]["key"];

export interface CreateQuestRequest {
  category: CategoryType;
  title: string;
  body: string;
  reward: string;
  deadline: string;
}

export type CreateQuestResult = { questId: string; title: string };
