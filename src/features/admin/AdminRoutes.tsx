import { Admin } from "./pages/Admin";
import { ProtectedRoute } from "../core/components/ProtectedRoute";

export const adminRoutes = [
  {
    path: "/admin",
    element: (
      <ProtectedRoute action="view" subject="adminPage">
        <Admin />
      </ProtectedRoute>
    ),
    exact: true,
  },
];