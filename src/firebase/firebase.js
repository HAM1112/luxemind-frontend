
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"

const firebaseConfig = {

    apiKey: "AIzaSyD2aY4u3KZ_OgKQg0Le1FfHZjo1_W2iO8k",
  
    authDomain: "luxemind-test.firebaseapp.com",
  
    projectId: "luxemind-test",
  
    storageBucket: "luxemind-test.appspot.com",
  
    messagingSenderId: "896681563284",
  
    appId: "1:896681563284:web:43e334360b6f30ccec5081",
  
    measurementId: "G-V8BTGG9VR4"
  
  };
  
export const app = initializeApp(firebaseConfig);
export const firebasestore = getStorage(app)




