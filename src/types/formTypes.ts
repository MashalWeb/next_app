import { ReactNode } from "react";
export default interface Props {
   children?: ReactNode;
   type: "submit" | "button";
}
