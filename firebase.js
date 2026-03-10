import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getStorage, ref, uploadBytes } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyD1Fs9-K9kfIoLOrojHoN59Zi_loyA1ApI",
  authDomain: "campus-print-77493.firebaseapp.com",
  projectId: "campus-print-77493",
  storageBucket: "campus-print-77493.appspot.com",
  messagingSenderId: "513502177317",
  appId: "1:513502177317:web:e54acd59c68b1621f977cc"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();
const provider = new GoogleAuthProvider();

const storage = getStorage();
const db = getFirestore();


document.getElementById("login").onclick = async () => {

  try {

    const result = await signInWithPopup(auth, provider);

    const user = result.user;

    if (
      user.email.endsWith("@mallareddyuniversity.ac.in") ||
      user.email === "flash6027@gmail.com"
    ) {

      alert("Logged in: " + user.email);

    } else {

      alert("Only college emails allowed");

      await signOut(auth);

    }

  } catch (error) {

    console.error(error);
    alert(error.message);

  }

};


async function uploadFile(file, cost, pages) {

  const fileRef = ref(storage, "orders/" + file.name);

  await uploadBytes(fileRef, file);

  await addDoc(collection(db, "orders"), {

    file: file.name,
    cost: cost,
    pages: pages,
    date: new Date()

  });

}


window.uploadFile = uploadFile;