import { Link } from "react-router-dom";

function AddPark() {
  return (
    <>
      <h3>add park form</h3>
      <Link to="/"><button>cancel</button></Link>
    </>
  );
}

export default AddPark;