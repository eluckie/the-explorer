import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { auth } from "./../firebase.js";
import { signOut } from "firebase/auth";
import { useState } from "react";
import Logo from "./../img/tree.png";

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

  const userNameStyles = {
    color: "lightgray",
    textAlign: "right",
    margin: 20
  }

  const divStyles = {
    display: "inline-block",
    position: "relative"
  }

  const logoStyles = {
    float: "left",
    position: "absolute",
    display: "block",
    height: 200
  }

  const headerStyles = {
    fontSize: 60,
    fontWeight: "bold",
    color: "rgb(135, 104, 62)",
    lineHeight: "0.1em"
  }

  const buttonStyles = {
    backgroundColor: "rgb(150, 184, 115)",
    borderColor: "rgb(150, 184, 115)",
    borderRadius: "0.7rem",
    padding: 6,
    margin: 4
  }

  if (!currentUser) {
    return (
      <>
        <img style={logoStyles} src={Logo} alt="tree logo"/>
        <div style={divStyles}>
          <p style={headerStyles}>the Explorer</p>
          <p>and into the forest I go, to lose my mind and find my soul</p>
          <Link to="/sign-up"><button style={buttonStyles}>sign up</button></Link>
          <Link to="/sign-in"><button style={buttonStyles}>log in</button></Link>
        </div>
        <p style={userNameStyles}>{signOutSuccess}</p>
        <hr/>
      </>
    );
  } else {
    return (
      <>
        <img style={logoStyles} src={Logo} alt="tree logo"/>
        <div style={divStyles}>
          <p style={headerStyles}>the Explorer</p>
          <p>and into the forest I go, to lose my mind and find my soul</p>
          <Link to="/add-park"><button style={buttonStyles}>add new park</button></Link>
          <button onClick={handleSignOut} style={buttonStyles}>log out</button>
        </div>
        <p style={userNameStyles}>{currentUser.email}</p>
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