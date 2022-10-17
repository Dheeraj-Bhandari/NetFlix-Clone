 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
 import { getAuth, createUserWithEmailAndPassword , signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js";
 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

 // Your web app's Firebase configuration
 const firebaseConfig = {
   apiKey: "AIzaSyAeL1SpnrhRFYiyP3CE68w0dCbJ3S6KaUs",
   authDomain: "netflix-clone-d9308.firebaseapp.com",
   projectId: "netflix-clone-d9308",
   storageBucket: "netflix-clone-d9308.appspot.com",
   messagingSenderId: "723819264482",
   appId: "1:723819264482:web:89b156c58ea73e3999a1bb"
 };

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
 const auth = getAuth();

 console.log(app)
 
 document.getElementById('SignoutButton').addEventListener('click', (e) => {
   
    signOut(auth).then(() => {
        localStorage.setItem('login_user', true);
       alert("Signout Succesfully")
     })
     .catch((error) => {
       const errorCode = error.code;
       const errorMessage = error.message;
       // ..
       alert(errorMessage);
     });
 });