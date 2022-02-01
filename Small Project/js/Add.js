const form = document.getElementById("form");
const button = document.getElementById("button");
const ContactFirstName = document.getElementById("ContactFirstName");
const ContactLastName = document.getElementById("ContactLastName");
const ContactPhoneNumber = document.getElementById("ContactPhoneNumber");
const ContactEmail = document.getElementById("ContactEmail");
const ContactHomeAddress = document.getElementById("ContactHomeAddress");
const ContactBirthday = document.getElementById("ContactBirthday");
const ContactNotes = document.getElementById("ContactNotes");

let baseUrl = "http://group25.xyz/LAMPAPI";
let endpoint = `${baseUrl}/AddContact.php`;

function isPhoneNumber(num) {
    let pn = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

    return pn.test(num);
}

function isEmail(email) {
    let em = /\S+@\S+\.\S+/.test(email)

    return em.test(email);
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("Submitted form");

    let empty = [
        ContactUserID.value,
        ContactFirstName.value,
        ContactLastName.value,
    ].every((item)=> item.trim() === "");

    if(empty){
        console.log("Empty item(s) in form");
        return;
    }

    let body = {
        FirstName: ContactFirstName.value,
        LastName: ContactLastName.value,
        PhoneNumber: ContactPhoneNumber.value,
        Email: ContactEmail.value,
        HomeAddress: ContactHomeAddress.value,
        Birthday: ContactBirthday.value,
        Notes: ContactNotes.value,
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
});
