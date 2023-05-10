import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function DeleteConfirmation(props) {
  return (
    <>
      <h2>are you sure you want to delete {props.park.name}?</h2>
      <button>confirm delete</button>
      <br/><br/>
      <Link to="/details">cancel</Link>
    </>
  );
}

DeleteConfirmation.propTypes = {

};

export default DeleteConfirmation;