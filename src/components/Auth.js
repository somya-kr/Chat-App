import { auth, provider, db } from "../firebase-config.js";
import { doc, setDoc } from "firebase/firestore";
import { signInWithPopup } from "firebase/auth";

import "../styles/Auth.css";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const Auth = ({ setIsAuth }) => {
  // Function to sign in with Google
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider); // Sign in with Google using Firebase's signInWithPopup() function
      cookies.set("auth-token", result.user.refreshToken); // Set the authentication token in cookies

      const userRef = doc(db, "user", result.user.uid); // Get a reference to the user document in Firestore
      await setDoc(userRef, {
        uid: result.user.uid,
        name: result.user.displayName,
        email: result.user.email,
      }); // Set the user document with the user's information

      setIsAuth(true); // Set isAuth state to true
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
