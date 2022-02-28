import { useEffect, useState } from "react";

export default function LoggedInName() {
  const [data, setData] = useState({ firstName: "", lastName: "" });

  // on load run this inner function;
  useEffect(() => {
    const info = JSON.parse(localStorage.getItem("data") ?? "");
    const { firstName, lastName } = info.data;

    setData({
      firstName,
      lastName,
    });
  }, []);

  const doLogout = (event: any) => {
    event.preventDefault();
    localStorage.removeItem("data");
    window.location.href = "/";
  };

  return (
    <div id="loggedInDiv">
      <span id="userName">
        Logged In As {data.firstName} {data.lastName}{" "}
      </span>
      <br />
      <button
        type="button"
        id="logoutButton"
        className="buttons"
        onClick={doLogout}
      >
        Log Out
      </button>
    </div>
  );
}
