import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyDYgVdsQQGsQPmNlkviAAPyImvYGJ_aHdg",
  authDomain: "signupsystemcheck.firebaseapp.com",
  projectId: "signupsystemcheck",
  storageBucket: "signupsystemcheck.firebasestorage.app",
  messagingSenderId: "1676521893",
  appId: "1:1676521893:web:05a0961ca7e29d8963b84c",
  measurementId: "G-WLZZH6N3X7"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);


export { auth, db };
