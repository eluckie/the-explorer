import Icon from "./../img/tree.png";

function Footer() {
  const divStyles = {
    height: "60px",
    backgroundImage: `url(${Icon})`,
    backgroundSize: "contain"
  }

  return (
    <>
      <div style={divStyles}></div>
    </>
  );
}

export default Footer;