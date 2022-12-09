import Can from "../AbilityContext";
import { FC, ReactNode } from "react";
import { ErrorPage } from "../../shared/components/ErrorPage";


type ProtectedRouteProps = {
  action: string;
  subject: string;
  children: ReactNode;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ action, subject, children }) => {
  return (
    <>
      <Can I={action} a={subject}>
        {children}
      </Can>
      <Can not I={action} a={subject}>
        <ErrorPage message="You are not authorized to view this page!" />
      </Can>
    </>
  )
};