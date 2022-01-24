const form = document.getElementById("form");
const button = document.getElementById("button");
const formType = document.getElementById("formType");

const usernameBox = document.getElementById("username");
const passwordBox = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

for (item of formType.getElementsByTagName("h3")) {
  item.addEventListener("click", (e) => {
    for (i of formType.getElementsByTagName("h3")) {
      if (i.className === "active-button") {
        i.className = "active-button";
      } else {
        i.className = "inactive-button";
      }
    }
  });
}

window.onload = (e) => {
  e.preventDefault();
  console.log("Window loaded");

  let data = sessionStorage.getItem("cookie");
  if (data === null || data === undefined) {
    console.log("No data");
  } else {
    console.log("Data found");
    console.log(JSON.parse(data));

    // let element = formType.getElementsByTagName("h3")[0];
    // element.className = "";
  }
};

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  let formStuff = [];
  console.log("Submitted form");

  let call = await fetch(
    "https://random-data-api.com/api/address/random_address?size=3"
  );

  let data = await call.json();
  formStuff = data.map((item) => item.city);

  sessionStorage.setItem("cookie", JSON.stringify(formStuff));
});
