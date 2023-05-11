import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import StateIcon from "./../img/state.png";
import NatlIcon from "./../img/natl.png";

function ParkDetails(props) {
  const { park, currentUser, onCancel } = props;

  const nameStyles = {
    fontSize: 26
  }
  
  const divStyles = {
    border: "2px solid rgb(135, 104, 62)",
    borderRadius: "0.7rem",
    width: 700,
    margin: "auto"
  }

  if (!currentUser) {
    return (
      <>
      <div style={divStyles}>
        <h3 style={nameStyles} id="dark-green-accent">{park.name}</h3>
        <h5>{park.city}, {park.state}</h5>
        <p>
          {`${park.nationalPark}` === `${true}` ? "National Park" : "State Park"}
        </p>
        {`${park.nationalPark}` === `${true}` ? <img src={NatlIcon} alt="icon with 3 trees"/> : <img src={StateIcon} alt="tree icon"/>}
        <br/><br/>
      </div>
      <br/><br/>
      <Link to="/">back to list</Link>
      <br/><br/>
    </>
    );
  } else {
    return (
      <>
        <div style={divStyles}>
          <h3 style={nameStyles} id="dark-green-accent">{park.name}</h3>
          <h5>{park.city}, {park.state}</h5>
          <p>
            {`${park.nationalPark}` === `${true}` ? "National Park" : "State Park"}
          </p>
          {`${park.nationalPark}` === `${true}` ? <img src={NatlIcon} alt="icon with 3 trees"/> : <img src={StateIcon} alt="tree icon"/>}
          <br/><br/>
        </div>
        <br/><br/>
        <Link to="/edit-park"><button>edit park</button></Link>
        <Link to="/delete-park"><button>delete park</button></Link>
        <br/><br/>
        <p className="pLinks" id="brown-accent" onClick={onCancel}>back to list</p>
        <br/><br/>
      </>
    );
  }
}

ParkDetails.propTypes = {
  park: PropTypes.object,
  currentUser: PropTypes.object,
  onCancel: PropTypes.func
};

export default ParkDetails;