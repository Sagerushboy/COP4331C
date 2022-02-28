import PageTitle from "../components/PageTitle";
import Login from "../components/Login";
import { useEffect } from "react";

export default function LoginPage() {
  useEffect(() => localStorage.removeItem("data"), []); // make sure no data is available

  return (
    <div>
      <PageTitle />
      <Login />
    </div>
  );
}
