import admin from "firebase-admin";
import serviceAccount from "./service.json"; // Adjust path as needed

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const messaging = admin.messaging();

export { admin, messaging };
