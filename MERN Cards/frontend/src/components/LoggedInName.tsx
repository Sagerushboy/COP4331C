export default function LoggedInName() {
  // let user = {};

  const doLogout = (event: any) => {
    event.preventDefault();
    alert("doLogout");
  };

  return (
    <div id="loggedInDiv">
      <span id="userName">Logged In As John Doe </span>
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
