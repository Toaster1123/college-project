export type NodeType = "male" | "female" | "maleDead" | "femaleDead";

export interface FamilyNode {
  id: string;
  type: NodeType;
  x: number;
  y: number;
}
