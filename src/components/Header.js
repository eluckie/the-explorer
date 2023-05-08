import { Link } from "react-router-dom";

function Header() {
  const divStyles = {
    textAlign: "center"
  }

  return (
    <>
    <div style={divStyles}>
      <h1>the Explorer</h1>
      <p>and into the forest I go, to lose my mind and find my soul</p>
      <Link to="/sign-up"><button>sign up</button></Link>
      <Link to="/sign-in"><button>log in</button></Link>
      <button>log out</button>
    </div>
    </>
  );
}

export default Header;