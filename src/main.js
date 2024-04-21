import { createApp } from 'vue'
import App from './App.vue'
import router from './router.js'
import { initializeApp } from 'firebase/app';
import { getAuth , createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';



const firebaseConfig = {
  apiKey: "AIzaSyARquYBRC_WbTXjUKgua_1cmt_q679aVTY",
  authDomain: "tfgredsocial-f3935.firebaseapp.com",
  projectId: "tfgredsocial-f3935",
  storageBucket: "tfgredsocial-f3935.appspot.com",
  messagingSenderId: "1023455173944",
  appId: "1:1023455173944:web:e73bfae2e86aad953d75cd"
  };
  
  const firebaseApp = initializeApp(firebaseConfig);
  const auth = getAuth(firebaseApp);
  
  export const registerUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  
  export const loginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

createApp(App)
.use(router)

.use(auth)
.use(firebaseApp)
.mount('#app')



