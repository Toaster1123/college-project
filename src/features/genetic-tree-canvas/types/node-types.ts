import { TableTypes } from "@/features/genetic-tree-form";

export type NodeType = "male" | "female" | "maleDead" | "femaleDead";

export interface FamilyNode {
  id: string;
  type: NodeType;
  x: number;
  y: number;
}

export interface IAddDataCoord extends TableTypes {
  x: number;
  y: number;
}
