import PageTitle from "../components/PageTitle";
import Login from "../components/Login";
import { useEffect } from "react";

export default function LoginPage() {
  useEffect(() => {
    localStorage.removeItem("data");
  }, []);

  return (
    <div>
      <PageTitle />
      <Login />
    </div>
  );
}
