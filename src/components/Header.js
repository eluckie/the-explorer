import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { auth } from "./../firebase.js";
import { signOut } from "firebase/auth";
import { useState } from "react";

function Header(props) {
  const { currentUser, setCurrentUser } = props;

  const [signOutSuccess, setSignOutSuccess] = useState(null);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setSignOutSuccess("You've successfully signed out");
        setCurrentUser(null);
      })
      .catch((error) => {
        setSignOutSuccess(`There was an error signing out: ${error.message}!`)
      });
  }

  const userStyles = {
    color: "lightgray",
    textAlign: "right"
  }

  if (!currentUser) {
    return (
      <>
        <div>
          <h1>the Explorer</h1>
          <p>and into the forest I go, to lose my mind and find my soul</p>
          <Link to="/sign-up"><button>sign up</button></Link>
          <Link to="/sign-in"><button>log in</button></Link>
          <p style={userStyles}>{signOutSuccess}</p>
        </div>
        <hr/>
      </>
    );
  } else {
    return (
      <>
      <div>
        <h1>the Explorer</h1>
        <p>and into the forest I go, to lose my mind and find my soul</p>
        <Link to="/add-park"><button>add new park</button></Link>
        <button onClick={handleSignOut}>log out</button>
        <p style={userStyles}>{currentUser.email}</p>
      </div>
      <hr/>
      </>
    );
  }
}

Header.propTypes = {
  currentUser: PropTypes.object,
  setCurrentUser: PropTypes.func
};

export default Header;