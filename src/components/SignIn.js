import { Link } from "react-router-dom";
import { auth } from "./../firebase.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

function SignIn(props) {
  const [signInSuccess, setSignInSuccess] = useState(null);

  const navigate = useNavigate();

  function handleSignIn(e) {
    e.preventDefault();
    const email = e.target.email.value.toLowerCase();
    const password = e.target.password.value;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setSignInSuccess(`You've successfully signed in as ${userCredential.user.email}!`);
        props.setCurrentUser(userCredential.user);
        navigate("/");
      })
      .catch((error) => {
        setSignInSuccess(`There was an error signing in: ${error.message}`)
      });
  }

  return (
    <>
      <br/>
      <hr/>
      <br/>
      {signInSuccess}
      <form id="sign-in" onSubmit={handleSignIn}>
        <input
          type="text"
          name="email"
          placeholder="email"/>
        <br/>
        <input
          type="password"
          name="password"
          placeholder="password"/>
        <br/><br/>
        <button type="submit">go</button>
      </form>
      <Link to="/"><p>cancel</p></Link>
    </>
  );
}

SignIn.propTypes = {
  setCurrentUser: PropTypes.func
};

export default SignIn;