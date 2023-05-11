import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function DeleteConfirmation(props) {
  const { park, currentUser, onParkDeletion } = props;

  if (!currentUser) {
    return (
      <>
      <br/>
      <hr/>
        <h2>whoopsies! you shouldn't be here</h2>
        <Link to="/">go home</Link>
        <br/><br/>
      </>
    );
  } else {
    return (
      <>
        <h2>
          are you sure you want to remove<br/>
          {park.name}?
        </h2>
        <button onClick={() => onParkDeletion(park.parkId)}>confirm delete</button>
        <br/><br/>
        <Link to="/details">cancel</Link>
      </>
    );
  }
}

DeleteConfirmation.propTypes = {
  park: PropTypes.object,
  currentUser: PropTypes.object,
  onParkDeletion: PropTypes.func
};

export default DeleteConfirmation;