import { createBrowserRouter, Navigate } from "react-router-dom";

import { Layout } from '../shared/components/Layout';

import { menuRoutes } from "../menu/MenuRoutes";
import { adminRoutes } from "../admin/AdminRoutes";
import { authRoutes } from "../auth/AuthRoutes";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      ...menuRoutes,
      ...adminRoutes,
    ]
  },
  {
    path: '*',
    element: <Navigate to="/" replace />
  },
  ...authRoutes,
]);
