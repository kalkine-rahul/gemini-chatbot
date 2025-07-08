// src/lib/firebase.js
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCjAAMGwUnVFzr2X2joyJCMFu7dqm8WvTs",
  authDomain: "notifications-api-ea262.firebaseapp.com",
  projectId: "notifications-api-ea262",
  storageBucket: "notifications-api-ea262.appspot.com",
  messagingSenderId: "503378660245",
  appId: "1:503378660245:web:13e1e9fc3dde56708f049c",
};

const app = initializeApp(firebaseConfig);

export { app };
