const form = document.getElementById("form");
const button = document.getElementById("button");
const ContactFirstName = document.getElementById("ContactFirstName");
const ContactLastName = document.getElementById("ContactLastName");
const ContactPhoneNumber = document.getElementById("ContactPhoneNumber");
const ContactEmail = document.getElementById("ContactEmail");
const ContactHomeAddress = document.getElementById("ContactHomeAddress");
const ContactBirthday = document.getElementById("ContactBirthday");
const ContactNotes = document.getElementById("ContactNotes");

let baseUrl = "http://group25.xyz/API";
let endpoint = `${baseUrl}/AddContact.php`;

function getUserInfo() {
  return JSON.parse(sessionStorage.getItem("userInfo"));
}

// TODO: Decide if to use this
// function isPhoneNumber(num) {
//     let pn = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

//     return pn.test(num);
// }

// TODO: Add isEmail to form handling
function isEmail(email) {
  let em = /\S+@\S+\.\S+/.test(email);

  return em.test(email);
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log("Submitted form");

  let empty = [ContactFirstName.value, ContactLastName.value].some(
    (item) => item.trim() === ""
  );

  if (empty) {
    // TODO: highlight text that is empty
    console.log("Empty item(s) in form");
    return;
  }

  let userInfo = getUserInfo();
  console.log(userInfo);

  let body = {
    FirstName: ContactFirstName.value,
    LastName: ContactLastName.value,
    PhoneNumber: ContactPhoneNumber.value,
    EmailAddress: ContactEmail.value,
    HomeAddress: ContactHomeAddress.value,
    Birthday: ContactBirthday.value,
    Notes: ContactNotes.value,
    UserID: userInfo.ID,
  };

  console.log(endpoint);
  console.log(body);

  let response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  let data = await response.json();
  if (data.error) {
    console.log("Error with API");
    console.log(data.error);
  }

  window.location.href = "/dashboard.html";
});
