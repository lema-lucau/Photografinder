import { initializeApp } from "firebase/app"; 
import {getAuth} from "firebase/auth"
import * as authDetails from './constants/firebaseAuth';

const firebaseConfig = {
  apiKey: authDetails.FB_API_KEY,
  authDomain: authDetails.FB_AUTH_DOMAIN,
  projectId: authDetails.FB_PROJECT_ID,
  storageBucket: authDetails.FB_STORAGE_BUCKET,
  messagingSenderId: authDetails.FB_MESSAGING_SENDER_ID,
  appId: authDetails.FB_APP_ID,
  measurementId: authDetails.FB_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
