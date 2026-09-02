import type React from "react";
import { Navigate } from "react-router";

export default function AuthProtectedRoute({ children }:{children:React.ReactNode}) {
  if (localStorage.getItem("tkn")) {
    return <Navigate to={"/post"} />;
  }

  return <>{children}</>;
}
