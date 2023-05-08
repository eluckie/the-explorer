import { Link } from "react-router-dom";

function DeleteConfirmation() {
  return (
    <>
      <h2>are you sure you want to delete?</h2>
      <button>confirm delete</button>
      <br/><br/>
      <Link to="/details">cancel</Link>
    </>
  );
}

export default DeleteConfirmation;