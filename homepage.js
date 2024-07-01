
//////////////////////////////////////////////////////////
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  getFirestore,
  getDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDE6micSH2dW5H4Y6RLmjLo-zU1rgiK-J4",
  authDomain: "login-form-41b79.firebaseapp.com",
  projectId: "login-form-41b79",
  storageBucket: "login-form-41b79.appspot.com",
  messagingSenderId: "320009613878",
  appId: "1:320009613878:web:8fca664ad5bce95466de97",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore();

// Function to check if the referrer is from the same origin
function isSameOriginReferrer(referrer, currentOrigin) {
  if (!referrer) return false;

  const referrerUrl = new URL(referrer);
  const referrerOrigin = referrerUrl.origin;

  return referrerOrigin === currentOrigin;
}

// Check if the referrer is from the same origin
const currentOrigin = window.location.origin;
const referrer = document.referrer;

if (!isSameOriginReferrer(referrer, currentOrigin)) {
  // If the referrer is not from the same origin, redirect to login page
  window.location.href = "loginpage.html";
}

onAuthStateChanged(auth, (user) => {
  const loggedInUserId = localStorage.getItem("loggedInUserId");
  if (loggedInUserId) {
    console.log(user);
    const docRef = doc(db, "users", loggedInUserId);
    getDoc(docRef)
      .then((docSnap) => {
        if (docSnap.exists()) {
          const userData = docSnap.data();
          document.getElementById("loggedUserFName").innerHTML =
            userData.firstName;
          document.getElementById("loggedUserEmail").innerHTML = userData.email;
          document.getElementById("loggedUserFName").value = userData.firstName;
          document.getElementById("loggedUserLName").value = userData.lastName;
          document.getElementById("loggedUserLName").innerHTML =
            userData.lastName;
          document.getElementById("loggedUserEmail").value = userData.email;
          document.getElementById("password").value = userData.password;
        } else {
          console.log("No document found matching ID");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  } else {
    console.log("User Id not Found in Local storage");
  }
});

const logoutButton = document.getElementById("logout");
logoutButton.addEventListener("click", () => {
  localStorage.removeItem("loggedInUserId");
  signOut(auth)
    .then(() => {
      window.location.href = "index.html";
    })
    .catch((error) => {
      console.error("Error Signing out:", error);
    });
});