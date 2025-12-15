import { FC } from "react";
import { FormLabelBadge } from "./form-label-badge";

interface Props {
  type: "relation" | "boolean" | "disease";
  label?: string;
  gender?: "муж" | "жен";
}

export const FamilyTableBodyItem: FC<Props> = ({ type, label, gender }) => {
  switch (type) {
    case "relation":
      return (
        <td className="px-4 py-3">
          <FormLabelBadge
            label={label}
            condition={gender === "муж"}
            colorSchema="gender"
          />
        </td>
      );

    case "boolean":
      const hasDisease = label && label === "Да" ? true : false;

      return (
        <td className="px-4 py-3">
          <FormLabelBadge
            condition={hasDisease}
            label={label}
            colorSchema="exist"
          />
        </td>
      );

    case "disease": {
      const hasDisease = label && label.trim().length > 0 ? true : false;
      if (!hasDisease) {
        return (
          <td className="px-4 py-3">
            <FormLabelBadge
              condition={false}
              label={"Нет"}
              colorSchema="exist"
            />
          </td>
        );
      }

      return (
        <td className="px-4 py-3 text-gray-900 dark:text-gray-100">{label}</td>
      );
    }
    default:
      return <td />;
  }
};
