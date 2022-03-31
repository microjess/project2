//email and password regex
const emailRegex =
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
const passRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const nameRegex = /[\w]{5,}/;

const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const email = document.querySelector("#email-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();
  const goodEmail = emailRegex.test(email);
  const goodPassword = passRegex.test(password);
  const emailHint = document.querySelector("#loginHintEmail");
  const passwordHint = document.querySelector("#loginHintPassword");

  if (goodEmail && goodPassword) {
    // Send a POST request to the API endpoint
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      // If successful, redirect the browser to the home page
      document.location.replace("/");
    } else {
      switch (response.statusText) {
        case "Incorrect email, please try again":
          emailHint.style.backgroundColor = "var(--deniedColor)";
          emailHint.innerText = response.statusText;
          emailHint.style.display = "block";
          break;
        case "Incorrect password, please try again":
          passwordHint.style.backgroundColor = "var(--deniedColor)";
          passwordHint.innerText = response.statusText;
          passwordHint.style.display = "block";
          break;

        default:
          break;
      }
    }
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();
  document.getElementById("sign_up").disabled = true;
  const name = document.querySelector("#name-signup").value.trim();
  const email = document.querySelector("#email-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();
  const goodEmail = emailRegex.test(email);
  const goodpassword = passRegex.test(password);
  const nameHint = document.querySelector("#signupHintName");
  const emailHint = document.querySelector("#signupHintEmail");
  const passwordHint = document.querySelector("#signupHintPassword");

  if (name && goodEmail && goodpassword) {
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      document.getElementById("sign_up").disabled = false;
      console.log(response.statusText); 
      switch (response.statusText) {
        case "Username must be unique":
          nameHint.style.backgroundColor = "var(--deniedColor)";
          nameHint.innerText = "Username taken";
          break;
        case "Email must be unique":
          emailHint.style.backgroundColor = "var(--deniedColor)";
          emailHint.innerText = "Email already registered";
          nameHint.style.backgroundColor = "var(--acceptedColor)";
          nameHint.innerText = "Name must be Alphanumeric (a-zA-Z0-9)";
          break;
        case "Email not in correct format":
          emailHint.style.backgroundColor = "var(--deniedColor)";
          emailHint.innerText = response.statusText;
          break;
        case "Password not in correct format":
          passwordHint.style.backgroundColor = "var(--deniedColor)";
          passwordHint.innerText = response.statusText;
          break;

        default:
          break;
      }
    }
  }
};

const checkValidation = (event) => {
  // event.preventDefault();
  const name = document.querySelector("#name-signup").value.trim();
  const email = document.querySelector("#email-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();
  const targetValue = event.target.value;
  const thisHint = event.target.parentElement.querySelector(".signupHints");
  switch (event.target.getAttribute("id")) {
    case "name-signup":
      if (nameRegex.test(targetValue)) {
        thisHint.style.backgroundColor = "var(--acceptedColor)";
        setTimeout(() => {
          thisHint.style.display = "none";
        }, 2000);
      } else {
        thisHint.style.display = "block";
        thisHint.style.backgroundColor = "var(--deniedColor)";
      }
      break;
    case "email-signup":
      if (emailRegex.test(targetValue)) {
        thisHint.style.backgroundColor = "var(--acceptedColor)";
        setTimeout(() => {
          thisHint.style.display = "none";
        }, 2000);
      } else {
        thisHint.style.display = "block";
        thisHint.style.backgroundColor = "var(--deniedColor)";
      }
      break;
    case "password-signup":
      if (passRegex.test(targetValue)) {
        thisHint.style.backgroundColor = "var(--acceptedColor)";
        setTimeout(() => {
          thisHint.style.display = "none";
        }, 2000);
      } else {
        thisHint.style.display = "block";
        thisHint.style.backgroundColor = "var(--deniedColor)";
      }
      break;
    case "email-login":
      if (emailRegex.test(targetValue)) {
        thisHint.style.backgroundColor = "var(--acceptedColor)";
        setTimeout(() => {
          thisHint.style.display = "none";
        }, 1000);
      } else {
        thisHint.style.display = "block";
        thisHint.style.backgroundColor = "var(--deniedColor)";
      }
      break;
    case "password-login":
      if (thisHint.innerText === "Incorrect password, please try again") {
        thisHint.style.backgroundColor = "var(--deniedColor)";
        thisHint.innerText = "Incorrect password, please try again";
      } else if (passRegex.test(targetValue)) {
        thisHint.style.backgroundColor = "var(--acceptedColor)";
        setTimeout(() => {
          if (thisHint.innerText !== "Incorrect password, please try again") {
            thisHint.style.display = "none";
          }
        }, 1000);
      } else {
        thisHint.style.display = "block";
        thisHint.style.backgroundColor = "var(--deniedColor)";
      }
      break;

    default:
      break;
  }
  if (
    emailRegex.test(email) &&
    passRegex.test(password) &&
    nameRegex.test(name)
  ) {
    document.querySelector("#sign_up").disabled = false;
  } else {
    document.querySelector("#sign_up").disabled = true;
  }
};

document
  .querySelector("#name-signup")
  .addEventListener("keyup", checkValidation);
document
  .querySelector("#email-signup")
  .addEventListener("keyup", checkValidation);
document
  .querySelector("#password-signup")
  .addEventListener("keyup", checkValidation);

document
  .querySelector("#email-login")
  .addEventListener("keyup", checkValidation);
document
  .querySelector("#password-login")
  .addEventListener("keydown", checkValidation);

document
  .querySelector(".login-form")
  .addEventListener("submit", loginFormHandler);

document
  .querySelector(".signup-form")
  .addEventListener("submit", signupFormHandler);
