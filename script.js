const signUpButton = document.getElementById("signUpButton");
const signInButton = document.getElementById("signInButton");
const signInForm = document.getElementById("signIn");
const signUpForm = document.getElementById("signup");

signUpButton.addEventListener("click", function () {
  signInForm.style.display = "none";
  signUpForm.style.display = "block";
});
signInButton.addEventListener("click", function () {
  signInForm.style.display = "block";
  signUpForm.style.display = "none";
});
// document.getElementById("submitSignIn").addEventListener("click", function () {
//   const emailInput = document.getElementById("email");
//   const passwordInput = document.getElementById("password");
//   const emailMessage = document.getElementById("emailMessage");
//   const passwordMessage = document.getElementById("passwordMessage");

//   const email = emailInput.value;
//   const password = passwordInput.value;

//   let emailValid = false;
//   let passwordValid = false;

//   // Email validation regex
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   if (emailRegex.test(email)) {
//     emailMessage.innerHTML = '<p class="valid">Valid email format</p>';
//     emailValid = true;
//   } else {
//     emailMessage.innerHTML = '<p class="invalid">Invalid email format</p>';
//   }

//   // Password validation criteria
//   const passwordCriteria = [
//     { regex: /.{8,}/, message: "At least 8 characters" },
//     { regex: /[A-Z]/, message: "At least one uppercase letter" },
//     { regex: /[a-z]/, message: "At least one lowercase letter" },
//     { regex: /[0-9]/, message: "At least one digit" },
//     { regex: /[^A-Za-z0-9]/, message: "At least one special character" },
//   ];

//   passwordMessage.innerHTML = "";
//   passwordCriteria.forEach((criteria) => {
//     if (criteria.regex.test(password)) {
//       passwordMessage.innerHTML += `<p class="valid">${criteria.message}</p>`;
//     } else {
//       passwordMessage.innerHTML += `<p class="invalid">${criteria.message}</p>`;
//     }
//   });

//   passwordValid = passwordCriteria.every((criteria) =>
//     criteria.regex.test(password)
//   );

//   if (emailValid && passwordValid) {
//     // Submit the form if both email and password are valid
//     document.getElementById("signInForm").submit();
//   }
// });
// function validateEmailAndPassword(
//   emailId,
//   emailMessageId,
//   passwordId,
//   passwordMessageId
// ) {
//   const emailInput = document.getElementById(emailId);
//   const passwordInput = document.getElementById(passwordId);
//   const emailMessage = document.getElementById(emailMessageId);
//   const passwordMessage = document.getElementById(passwordMessageId);

//   const email = emailInput.value;
//   const password = passwordInput.value;

//   let emailValid = false;
//   let passwordValid = false;

//   // Email validation regex
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   if (emailRegex.test(email)) {
//     emailMessage.innerHTML = '<p class="valid">Valid email format</p>';
//     emailValid = true;
//   } else {
//     emailMessage.innerHTML = '<p class="invalid">Invalid email format</p>';
//   }

//   // Password validation criteria
//   const passwordCriteria = [
//     { regex: /.{8,}/, message: "At least 8 characters" },
//     { regex: /[A-Z]/, message: "At least one uppercase letter" },
//     { regex: /[a-z]/, message: "At least one lowercase letter" },
//     { regex: /[0-9]/, message: "At least one digit" },
//     { regex: /[^A-Za-z0-9]/, message: "At least one special character" },
//   ];

//   passwordMessage.innerHTML = "";
//   passwordCriteria.forEach((criteria) => {
//     if (criteria.regex.test(password)) {
//       passwordMessage.innerHTML += `<p class="valid">${criteria.message}</p>`;
//     } else {
//       passwordMessage.innerHTML += `<p class="invalid">${criteria.message}</p>`;
//     }
//   });

//   passwordValid = passwordCriteria.every((criteria) =>
//     criteria.regex.test(password)
//   );

//   return emailValid && passwordValid;
// }

// document.getElementById("submitSignIn").addEventListener("click", function () {
//   if (
//     validateEmailAndPassword(
//       "email",
//       "emailMessage",
//       "password",
//       "passwordMessage"
//     )
//   ) {
//     document.getElementById("signInForm").submit();
//   }
// });

// document.getElementById("submitSignUp").addEventListener("click", function () {
//   if (
//     validateEmailAndPassword(
//       "rEmail",
//       "rEmailMessage",
//       "rPassword",
//       "rPasswordMessage"
//     )
//   ) {
//     document.getElementById("signUpForm").submit();
//   }
// });
function validateEmailAndPassword(
  emailId,
  emailMessageId,
  passwordId,
  passwordMessageId
) {
  const emailInput = document.getElementById(emailId);
  const passwordInput = document.getElementById(passwordId);
  const emailMessage = document.getElementById(emailMessageId);
  const passwordMessage = document.getElementById(passwordMessageId);

  const email = emailInput.value;
  const password = passwordInput.value;

  let emailValid = false;
  let passwordValid = false;

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailRegex.test(email)) {
    emailMessage.innerHTML = '<p class="valid">Valid email format</p>';
    emailValid = true;
  } else {
    emailMessage.innerHTML = '<p class="invalid">Invalid email format</p>';
  }

  // Password validation criteria
  const passwordCriteria = [
    { regex: /.{8,}/, message: "At least 8 characters" },
    { regex: /[A-Z]/, message: "At least one uppercase letter" },
    { regex: /[a-z]/, message: "At least one lowercase letter" },
    { regex: /[0-9]/, message: "At least one digit" },
    { regex: /[^A-Za-z0-9]/, message: "At least one special character" },
  ];

  passwordMessage.innerHTML = "";
  passwordCriteria.forEach((criteria) => {
    if (criteria.regex.test(password)) {
      passwordMessage.innerHTML += `<p class="valid">${criteria.message}</p>`;
    } else {
      passwordMessage.innerHTML += `<p class="invalid">${criteria.message}</p>`;
    }
  });

  passwordValid = passwordCriteria.every((criteria) =>
    criteria.regex.test(password)
  );

  return emailValid && passwordValid;
}

document.getElementById("submitSignIn").addEventListener("click", function () {
  if (
    validateEmailAndPassword(
      "email",
      "emailMessage",
      "password",
      "passwordMessage"
    )
  ) {
    document.getElementById("signInForm").submit();
  }
});

document
  .getElementById("submitSignUp")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Prevent default form submission

    if (
      validateEmailAndPassword(
        "rEmail",
        "rEmailMessage",
        "rPassword",
        "rPasswordMessage"
      )
    ) {
      document.getElementById("signUpForm").submit(); // Submit form if validation passes
    } else {
      // Show message or handle invalid input case
      console.log("Cannot sign up. Email or password format is invalid.");
      // Optionally, display a message to the user indicating why they cannot sign up.
    }
  });