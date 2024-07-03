import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, getDoc, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDE6micSH2dW5H4Y6RLmjLo-zU1rgiK-J4",
    authDomain: "login-form-41b79.firebaseapp.com",
    projectId: "login-form-41b79",
    storageBucket: "login-form-41b79.appspot.com",
    messagingSenderId: "320009613878",
    appId: "1:320009613878:web:8fca664ad5bce95466de97"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore();
const storage = getStorage();

function populateProfile(userData) {
    // Populate existing fields
    document.getElementById('loggedUserFName').value = userData.firstName;
    document.getElementById('loggedUserLName').value = userData.lastName;
    // Display profile image
    if (userData.profileImageURL) {
        document.getElementById('profileImage').src = userData.profileImageURL;
    }
}

// Check auth state
onAuthStateChanged(auth, (user) => {
    if (user) {
        const loggedInUserId = sessionStorage.getItem('loggedInUserId');
        if (loggedInUserId) {
            const docRef = doc(db, "users", loggedInUserId);
            getDoc(docRef)
                .then((docSnap) => {
                    if (docSnap.exists()) {
                        const userData = docSnap.data();
                        populateProfile(userData);
                    } else {
                        console.log("No document found matching ID");
                    }
                })
                .catch((error) => {
                    console.log("Error getting document:", error);
                });
        } else {
            console.log("User ID not found in local storage");
        }
    } else {
        console.log("User not logged in");
        window.location.href = 'visitor.html'; // Redirect to visitor page if not logged in
    }
});

// Enable form fields for editing
document.getElementById('editButton').addEventListener('click', () => {
    document.querySelectorAll('#profileForm input').forEach(input => {
        input.removeAttribute('disabled');
    });
    document.getElementById('editButton').style.display = 'none';
    document.getElementById('saveButton').style.display = 'inline-block';
});

// Save updated information including image to Firestore
document.getElementById('saveButton').addEventListener('click', () => {
    const loggedInUserId = sessionStorage.getItem('loggedInUserId');
    const docRef = doc(db, "users", loggedInUserId);
    const updatedData = {
        firstName: document.getElementById('loggedUserFName').value,
        lastName: document.getElementById('loggedUserLName').value,
    };

    // Handle image upload if a file is selected
    const file = document.getElementById('profileImageUpload').files[0];
    if (file) {
        const storageRef = ref(storage, `profile_images/${loggedInUserId}`);
        uploadBytes(storageRef, file).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((downloadURL) => {
                updatedData.profileImageURL = downloadURL;
                saveProfileData(docRef, updatedData);
            });
        }).catch((error) => {
            console.error("Error uploading image: ", error);
        });
    } else {
        saveProfileData(docRef, updatedData);
    }
});

function saveProfileData(docRef, updatedData) {
    setDoc(docRef, updatedData, { merge: true })
        .then(() => {
            alert("Profile information updated");
            document.querySelectorAll('#profileForm input').forEach(input => {
                input.setAttribute('disabled', true);
            });
            document.getElementById('editButton').style.display = 'inline-block';
            document.getElementById('saveButton').style.display = 'none';
        })
        .catch((error) => {
            console.error("Error updating document: ", error);
        });
}
