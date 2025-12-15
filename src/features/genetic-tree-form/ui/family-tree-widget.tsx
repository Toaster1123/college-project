import { FC } from "react";
import { FamilyMembersTable } from "./family-table";
import { FamilyTreeForm } from "./family-add-form";
import { FamilyTreeCanvas } from "@/features";

export const FamilyTreeWidget: FC = () => {
  return (
    <div className="max-w-7xl mx-auto py-8 space-y-8">
      <FamilyTreeForm />
      <FamilyMembersTable />
      <FamilyTreeCanvas />
    </div>
  );
};
