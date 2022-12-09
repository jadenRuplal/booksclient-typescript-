import { Navigate } from "react-router-dom";

export default function RequireAuth({ result, children }) {
  return (result !== null) | undefined ? (
    children
  ) : (
    <Navigate to="/sign-in" replace />
  );
}
