// Firebase configuration using environment variables
// This ensures API keys are not hardcoded in the source code

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "goldenaige.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "goldenaige",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "goldenaige.appspot.com",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "241195884047",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:241195884047:web:992055347cd00f344d7a",
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID || "G-51VL3BMR5H"
};

export default firebaseConfig;

