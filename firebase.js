import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyD1Fs9-K9kfIoLOrojHoN59Zi_loyA1ApI",
  authDomain: "campus-print-77493.firebaseapp.com",
  projectId: "campus-print-77493",
  storageBucket: "campus-print-77493.firebasestorage.app",
  messagingSenderId: "513502177317",
  appId: "1:513502177317:web:e54acd59c68b1621f977cc"
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export const storage = getStorage(app);
export const db = getFirestore(app);