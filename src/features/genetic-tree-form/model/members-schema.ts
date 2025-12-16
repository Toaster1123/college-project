import { membersValues, RelationType } from "@/shared";
import { z } from "zod";
const relationNames = membersValues.map((m) => m.name);
export const MembersSchema = z.object({
  relation: z
    .string()
    .refine((val) => relationNames.includes(val as RelationType), {
      message: "Выберите родственника",
    }),
  disease: z.string().optional(),
  isAlive: z.boolean(),
  isPregnant: z.boolean(),
  isConsanguineous: z.boolean(),
  gender: z.enum(["муж", "жен"]),
  parents: z.array(z.string()).optional(),
});

export type MembersSchemaValues = z.infer<typeof MembersSchema>;
