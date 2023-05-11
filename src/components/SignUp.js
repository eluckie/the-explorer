import { Link } from "react-router-dom";
import { useState } from "react";
import { auth } from "./../firebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

function SignUp(props) {
  const [signUpSuccess, setSignUpSuccess] = useState(null);

  const navigate = useNavigate();

  const textInputStyles = {
    borderColor: "rgb(150, 184, 115)",
    borderRadius: "0.7rem",
    padding: 6,
    paddingTop: 8
  }

  function handleSignUp(e) {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;
    if (password === confirmPassword) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          setSignUpSuccess(`You've successfully signed up, ${userCredential.user.email}!`)
          props.setCurrentUser(userCredential.user);
          navigate("/");
        })
        .catch((error) => {
          setSignUpSuccess(`There was an error signing up: ${error.message}!`)
        });
    } else {
      setSignUpSuccess("Your passwords did not match! Please try again");
    };
  }

  return (
    <>
      <h1>Sign Up</h1>
      {signUpSuccess}
      <form onSubmit={handleSignUp}>
        <input
          style={textInputStyles}
          type="text"
          name="email"
          placeholder="email" />
        <br/>
        <input
          style={textInputStyles}
          type="password"
          name="password"
          placeholder="password" />
        <br/>
        <input
          style={textInputStyles}
          type="password"
          name="confirmPassword"
          placeholder="confirm password" />
        <br/><br/>
        <button type="submit">sign up</button>
      </form>
      <Link to="/"><p>cancel</p></Link>
    </>
  );
}

SignUp.propTypes = {
  setCurrentUser: PropTypes.func
};

export default SignUp;