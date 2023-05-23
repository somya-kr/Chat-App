import { auth } from "../firebase-config.js";
import { signOut } from "firebase/auth";

import Cookies from "universal-cookie";

const cookies = new Cookies();

export const AppWrapper = ({ children, isAuth, setIsAuth, setIsInChat }) => {
  // Function to sign the user out
  const signUserOut = async () => {
    await signOut(auth); // Sign out the user using Firebase's signOut() function
    cookies.remove("auth-token"); // Remove the authentication token from cookies
    setIsAuth(false); // Set isAuth state to false
    setIsInChat(false); // Set isInChat state to false
  };

  return (
    <div className="App">
      <div className="app-header">
        <h1> Chat App </h1>
      </div>

      <div className="app-container">{children}</div>
      {isAuth && (
        // Render the sign out button if the user is authenticated
        <div className="sign-out">
          <button onClick={signUserOut}> Sign Out</button>
        </div>
      )}
    </div>
  );
};
