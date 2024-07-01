// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  get,
  child,
  update,
  remove,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyCPS6VMpcTH2goa5K-kTzQ7c87n5lyvzfI",
  authDomain: "contact-ad117.firebaseapp.com",
  databaseURL: "https://contact-ad117-default-rtdb.firebaseio.com",
  projectId: "contact-ad117",
  storageBucket: "contact-ad117.appspot.com",
  messagingSenderId: "526458612884",
  appId: "1:526458612884:web:7911b871a9b51ada60d881",
  measurementId: "G-H180DS43SQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

document
  .getElementById("postForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const usernameinput = document.getElementById("fullname").value;
    const emailinput = document.getElementById("email").value;
    const messageinput = document.getElementById("message").value;

    set(ref(db, "data/" + usernameinput), {
      username: usernameinput,
      email: emailinput,
      message: messageinput,
      // createdAt: serverTimestamp(),
    })
      .then(() => {
        alert("The message send success we will contact with you soon ❤️");
      })
      .catch((error) => {
        alert("Error: " + error);
      });

    document.getElementById("postForm").reset();
  });
