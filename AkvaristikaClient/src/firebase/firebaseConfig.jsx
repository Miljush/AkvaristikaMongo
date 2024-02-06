import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyClhz0uDuySvRzZacZEaqGkVj2APyZWbFE",
  authDomain: "akvaristika-f87e4.firebaseapp.com",
  projectId: "akvaristika-f87e4",
  storageBucket: "akvaristika-f87e4.appspot.com",
  messagingSenderId: "709493063389",
  appId: "1:709493063389:web:2f3299e6e4594b68886534",
};
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
