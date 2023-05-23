import { auth, provider, db } from "../firebase-config.js";
import { doc, setDoc } from "firebase/firestore";
import { signInWithPopup } from "firebase/auth";

import "../styles/Auth.css";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const Auth = ({ setIsAuth }) => {
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      cookies.set("auth-token", result.user.refreshToken);
      
      // Create a new user entry in Firestore
      const userRef = doc(db, "user", result.user.uid);
      await setDoc(userRef, {
        uid: result.user.uid,
        name: result.user.displayName,
        email: result.user.email,
        // Add any additional user data you want to store
      });
      
      setIsAuth(true);
    } catch (err) {
      console.error(err);
    }
  };
  
  return (
    <div className="auth">
      <p>Sign In With Google To Continue</p>
      <button onClick={signInWithGoogle}>Sign In With Google</button>
    </div>
  );
};
