import firebase from "firebase";

// CONFIG
import APP_ENV from "constant";

const firebaseConfig = {
  apiKey: APP_ENV.FIREBASE.API_KEY,
  authDomain: APP_ENV.FIREBASE.AUTH_DOMAIN,
  projectId: APP_ENV.FIREBASE.PROJECT_ID,
  storageBucket: APP_ENV.FIREBASE.STORAGE_BUCKET,
  messagingSenderId: APP_ENV.FIREBASE.MESSAGING_SENDER_ID,
  appId: APP_ENV.FIREBASE.APP_ID,
};

try {
  firebase.initializeApp(firebaseConfig);
} catch (err) {
  if (!/already exists/.test(err.message)) {
    throw new Error("Firebase initialization error");
  }
}
const fire = firebase;

export default fire;
