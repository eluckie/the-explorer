import { Link } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";

function SignIn() {

  function handleSignIn(e) {
    e.preventDefault();
    const username = e.target.username.value.toLowerCase();
    const password = e.target.password.value;

  }

  return (
    <>
      <br/>
      <hr/>
      <br/>
      <form id="sign-in" onSubmit={handleSignIn}>
        <input
          type="text"
          name="username"
          placeholder="username"/>
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

export default SignIn;