"use client";

import { create } from "zustand";
import { TableFormValues, TableTypes } from "../types";
import { getParentIds } from "../lib";

type FamilyStore = {
  members: TableTypes[];
  addMember: (member: TableFormValues) => void;
  removeMember: (id: string) => void;
};

export const useFamilyStore = create<FamilyStore>((set, get) => ({
  members: [],
  addMember: (member) => {
    const id = crypto.randomUUID();

    const currentMembers = get().members;
    const parentIds = getParentIds(member, currentMembers);

    const newMember: TableTypes = {
      ...member,
      id,
      parents: parentIds,
    };

    const updatedMembers = currentMembers.map((m) => {
      const childParents = getParentIds(m, [newMember]);
      if (childParents.length > 0) {
        return {
          ...m,
          parents: [
            ...m.parents,
            ...childParents.filter((pid) => !m.parents.includes(pid)),
          ],
        };
      }
      return m;
    });

    set({ members: [...updatedMembers, newMember] });
  },
  removeMember: (id) =>
    set((state) => ({
      members: state.members.filter((m) => m.id !== id),
    })),
}));
