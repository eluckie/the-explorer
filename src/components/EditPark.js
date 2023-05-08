import { Link } from "react-router-dom";

function EditPark() {
  return (
    <>
      <h3>edit park form</h3>
      <Link to="/details"><button>cancel</button></Link>
    </>
  );
}

export default EditPark;