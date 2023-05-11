import Icon from "./../img/tree.png";
import { Link } from "react-router-dom";

function Footer() {
  const divStyles = {
    height: "60px",
    backgroundImage: `url(${Icon})`,
    backgroundSize: "contain"
  }

  return (
    <>
      <Link to="/"><div style={divStyles}></div></Link>
    </>
  );
}

export default Footer;