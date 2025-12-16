import { RelationType } from "@/shared";

export interface TableFormValues {
  relation: RelationType;
  disease?: string;
  isAlive: boolean;
  isPregnant: boolean;
  isConsanguineous: boolean;
  gender: "муж" | "жен";
  parents: string[];
}
export interface TableTypes extends TableFormValues {
  id: string;
}
