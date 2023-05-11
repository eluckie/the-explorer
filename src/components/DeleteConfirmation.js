import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function DeleteConfirmation(props) {
  const { park, currentUser, onParkDeletion } = props;

  const buttonStyles = {
    backgroundColor: "rgb(135, 104, 62)",
    borderColor: "rgb(135, 104, 62)"
  }

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
          are you sure you want to delete<br/>
          <span id="dark-green-accent">{park.name}</span>?
        </h2>
        <button style={buttonStyles} onClick={() => onParkDeletion(park.parkId)}>confirm delete</button>
        <br/><br/>
        <Link to="/details">cancel</Link>
        <br/><br/>
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