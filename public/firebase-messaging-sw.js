// public/firebase-messaging-sw.js
importScripts("https://www.gstatic.com/firebasejs/10.11.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.11.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyCjAAMGwUnVFzr2X2joyJCMFu7dqm8WvTs",
  authDomain: "notifications-api-ea262.firebaseapp.com",
  projectId: "notifications-api-ea262",
  storageBucket: "notifications-api-ea262.appspot.com",
  messagingSenderId: "874887024662",
  appId: "1:503378660245:web:13e1e9fc3dde56708f049c",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("📥 Background message:", payload);
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: "/logo.png", // optional icon
  });
});
