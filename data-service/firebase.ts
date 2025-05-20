// firebase.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from '@firebase/auth';
import { getFirestore } from 'firebase/firestore';

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
const db = getFirestore(app)
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
// const auth = getAuth(app);

export { app, auth , db };
