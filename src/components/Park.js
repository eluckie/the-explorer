import PropTypes from "prop-types";
import StateIcon from "./../img/state.png";
import NatlIcon from "./../img/natl.png";

function Park(props) {
  return (
    <>
      <div onClick={() => props.whenParkClicked(props.parkId)}>
        <h3 id="dark-green-accent">{props.name}</h3>
        <h5>{props.city}, {props.state}</h5>
        <p>
          {`${props.nationalPark}` === `${true}` ? "National Park" : "State Park"}
        </p>
        {`${props.nationalPark}` === `${true}` ? <img src={NatlIcon} alt="icon with 3 trees"/> : <img src={StateIcon} alt="tree icon"/>}
      </div>
    </>
  );
}

Park.propTypes = {
  whenParkClicked: PropTypes.func,
  parkId: PropTypes.number,
  name: PropTypes.string,
  city: PropTypes.string,
  state: PropTypes.string,
  nationalPark: PropTypes.bool,
  statePark: PropTypes.bool
};

export default Park;