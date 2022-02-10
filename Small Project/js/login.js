const form = document.getElementById("form");
const button = document.getElementById("button");
const formType = document.getElementById("formType");
let baseUrl = "http://group25.xyz/API";
let endpoint = "";

const username = document.getElementById("username");
const password = document.getElementById("password");
const confirmBox = document.getElementById("confirm");
const confirmPassword = document.getElementById("confirmPassword");
const messageBox = document.getElementById("messageBox");

const personalInfo = document.getElementById("userInfo");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");

function showMessageBox(msg) {
  if (messageBox.className.includes("hidden")) {
    messageBox.classList.toggle("hidden");
  }

  messageBox.getElementsByTagName("h1")[0].innerHTML = msg;
}

function setSignType(type) {
  const buttons = formType.getElementsByTagName("button");
  // login
  if (type) {
    buttons[0].className = "active-button";
    buttons[1].className = "inactive-button";

    if (!personalInfo.classList.contains("hidden")) {
      personalInfo.classList.toggle("hidden");
      confirmBox.classList.toggle("hidden");
    }

    endpoint = `${baseUrl}/Login.php`;
    button.value = "Login";
  } else {
    // signup
    buttons[0].className = "inactive-button";
    buttons[1].className = "active-button";

    if (personalInfo.classList.contains("hidden")) {
      personalInfo.classList.toggle("hidden");
      confirmBox.classList.toggle("hidden");
    }

    endpoint = `${baseUrl}/SignUp.php`;
    button.value = "Signup";
  }
}

for (item of formType.getElementsByTagName("button")) {
  item.addEventListener("click", (e) => {
    const text = e.target.innerHTML;

    setSignType(text === "Login");
  });
}

window.onload = (e) => {
  e.preventDefault();
  console.log("Window loaded");

  let data = JSON.parse(sessionStorage.getItem("userInfo"));

  if (data === null || data === undefined) {
    console.log("No data");
    setSignType(false);
  } else {
    console.log("Data found");
    setSignType(true);
  }
};

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  console.log("Submitted form");
  // document.getElementById("incorrectLogin").style.visibility = 'hidden';

  if (button.value.toLowerCase() === "login") {
    if (username.value.trim() === "" || password.value.trim() === "") {
      console.log("User/pass is empty");

      let error = "";
      if (username.value.trim() === "" && password.value.trim() === "") {
        error = "Username and password";
      } else {
        error = username.value.trim() === "" ? "Username" : "Password";
      }

      showMessageBox(`${error} is empty.`);
      return;
    }
  } else {
    let empty = [
      username.value,
      password.value,
      firstName.value,
      lastName.value,
      confirmPassword.value,
    ].some((item) => item.trim() === "");

    if (empty) {
      console.log("Empty item(s) in form");
      showMessageBox("Empty item(s) in form");
      return;
    }

    if (password.value !== confirmPassword.value) {
      console.log("Wrong passwords");
      showMessageBox("Passwords do not match");

      return;
    }
  }

  let body = {
    UserName: username.value,
    Password: password.value,
    FirstName: firstName.value,
    LastName: lastName.value,
  };

  console.log(endpoint);

  let response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  let data = await response.json();

  if (data.error) {
    console.log("There was an error with the api call");
    console.log(data.error);

    showMessageBox(
      `${button.innerHTML === "Login" ? "Login" : "Registration"} failed.`
    );

    return;
  } else {
    showMessageBox(
      `${button.innerHTML === "Login" ? "Login" : "Registration"} successful.`
    );
  }

  sessionStorage.setItem("userInfo", JSON.stringify(data));
  window.location.href = "/dashboard.html";
});
