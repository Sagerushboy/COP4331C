const form = document.getElementById("form");
const button = document.getElementById("button");
const formType = document.getElementById("formType");
let baseUrl = "http://group25.xyz/LAMPAPI";
let endpoint = "";

const usernameBox = document.getElementById("username");
const passwordBox = document.getElementById("password");

const personalInfo = document.getElementById("userInfo");
const firstNameBox = document.getElementById("firstName");
const lastNameBox = document.getElementById("lastName");

function setSignType(type) {
  const buttons = formType.getElementsByTagName("button");
  // login
  if (type) {
    buttons[0].className = "active-button";
    buttons[1].className = "inactive-button";

    if (!personalInfo.classList.contains("hidden")) {
      personalInfo.classList.toggle("hidden");
    }

    endpoint = `${baseUrl}/Login.php`;
    button.value = "Login";
  } else {
    // signup
    buttons[0].className = "inactive-button";
    buttons[1].className = "active-button";

    if (personalInfo.classList.contains("hidden")) {
      personalInfo.classList.toggle("hidden");
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

  let data = sessionStorage.getItem("cookie");
  if (data === null || data === undefined) {
    console.log("No data");
    setSignType(false);
  } else {
    console.log("Data found");
    console.log(JSON.parse(data));

    setSignType(true);
  }
};

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  console.log("Submitted form");

  if (button.value.toLowerCase() === "login") {
    if (usernameBox.value.trim() === "" || passwordBox.value.trim() === "") {
      console.log("User/pass is empty");
      return;
    }
  } else {
    let empty = [
      usernameBox.value,
      passwordBox.value,
      firstNameBox.value,
      lastNameBox.value,
    ].every((item) => item.trim() === "");

    if (empty) {
      console.log("Empty item(s) in form");
      return;
    }
  }

  let body = {
    UserName: usernameBox.value,
    Password: passwordBox.value,
    FirstName: firstNameBox.value,
    LastName: lastNameBox.value,
  };

  console.log(endpoint);

  let temp = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  console.log(await temp.json());

  // sessionStorage.setItem("cookie", JSON.stringify(formStuff));
});
