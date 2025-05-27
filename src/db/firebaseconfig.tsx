
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyA3ov7Z21EZa74p8gbjIibx1UGFhpl6lQ4",
  authDomain: "maegan-website-e0b47.firebaseapp.com",
  projectId: "maegan-website-e0b47",
  storageBucket: "maegan-website-e0b47.firebasestorage.app",
  messagingSenderId: "911750673992",
  appId: "1:911750673992:web:882e2f7a4fa52190f30a7d",
  measurementId: "G-WXLBMVCVBW"
};

export default firebaseConfig;

const app = initializeApp(firebaseConfig);