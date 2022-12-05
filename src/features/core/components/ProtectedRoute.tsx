import { FC, ReactNode } from "react";
import Can from "../abilityContext";

type ProtectedRouteProps = {
  action: string;
  subject: string;
  children: ReactNode;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ action, subject, children }) => {
  return (
    <Can I={action} a={subject} >
      {children}
    </Can>
  )
};