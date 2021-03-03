import * as admin from "firebase-admin";
import { ServiceAccount } from "firebase-admin";

// CONFIG
import APP_ENV from "constant";

const FirebaseConfig: ServiceAccount = {
  projectId: APP_ENV.FIREBASE_ADMIN.PROJECT_ID,
  privateKey: APP_ENV.FIREBASE_ADMIN.PRIVATE_KEY.replace(/\\n/g, "\n"),
  clientEmail: APP_ENV.FIREBASE_ADMIN.CLIENT_EMAIL,
};

try {
  admin.initializeApp({
    credential: admin.credential.cert(FirebaseConfig),
  });
} catch (err) {
  if (!/already exists/.test(err.message)) {
    throw new Error("Firebase initialization error");
  }
}

export default admin;
