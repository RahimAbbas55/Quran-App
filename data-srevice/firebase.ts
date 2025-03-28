import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyC_UFBZZSoerpqyOwivaRkjkY-gOirF9l4",
  authDomain: "quran-app-8e607.firebaseapp.com",
  projectId: "quran-app-8e607",
  storageBucket: "quran-app-8e607.firebasestorage.app",
  messagingSenderId: "564694491328",
  appId: "1:564694491328:web:789044689d73221d320d25",
  measurementId: "G-2J22FXL4FV"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);