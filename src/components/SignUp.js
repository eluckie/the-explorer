import { Link } from "react-router-dom";
import { useState } from "react";
import { getAuth } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";

function SignUp() {
  const [signUpSuccess, setSignUpSuccess] = useState(null);

  function handleSignUp(e) {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;
    if (password === confirmPassword) {
      createUserWithEmailAndPassword(getAuth, email, password)
        .then((userCredential) => {
          setSignUpSuccess(`You've successfully signed up, ${userCredential.user.email}!`)
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
          type="text"
          name="email"
          placeholder="email" />
        <br/>
        <input
          type="password"
          name="password"
          placeholder="password" />
        <br/>
        <input
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

export default SignUp;