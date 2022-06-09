// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import 'firebase/firestore';
import { initializeFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCXdQAsG1mSTMYBznHJsxSzJV2WvkJXflI',
  authDomain: 'crypto-app-8feb3.firebaseapp.com',
  projectId: 'crypto-app-8feb3',
  storageBucket: 'crypto-app-8feb3.appspot.com',
  messagingSenderId: '820357984576',
  appId: '1:820357984576:web:6d607dd3bffde5a8770aa5',
  measurementId: 'G-NTJKTL9HJM',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = initializeFirestore(app, {});
