import { useState } from "react";

export default function Login() {
  const [loginInfo, setLoginInfo] = useState({ username: "", password: "" });

  const doLogin = async (event: any) => {
    event.preventDefault();
    // alert("doIt()");

    let resp = await fetch("http://localhost:8080/cards/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...loginInfo, card: "deez" }) as any,
    });

    let data = await resp.json();

    if (resp.status !== 200) {
      const { error } = data;
      console.error(error);
      return;
    }

    console.log(data);

    localStorage.setItem("data", JSON.stringify(data));
    window.location.href = "/cards";
  };

  return (
    <div id="loginDiv">
      <form onSubmit={doLogin}>
        <span id="inner-title">PLEASE LOG IN</span>
        <br />
        <input
          type="text"
          id="loginName"
          placeholder="Username"
          onChange={(e) =>
            setLoginInfo({ ...loginInfo, username: e.target.value })
          }
        />
        <br />
        <input
          type="password"
          id="loginPassword"
          placeholder="Password"
          onChange={(e) =>
            setLoginInfo({ ...loginInfo, password: e.target.value })
          }
        />
        <br />
        <input
          type="submit"
          id="loginButton"
          className="buttons"
          value="Do It"
          onClick={doLogin}
        />
      </form>
      <span id="loginResult">{/* TODO: Add message here? */}</span>
    </div>
  );
}
