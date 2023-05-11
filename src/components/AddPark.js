import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function AddPark(props) {
  const { currentUser, onNewParkCreation } = props;

  const textInputStyles = {
    borderColor: "rgb(150, 184, 115)",
    borderRadius: "0.7rem",
    padding: 6,
    width: 260
  }

  const center = {
    textAlign: "center"
  }

  function handleNewParkFormSubmission(e) {
    e.preventDefault();
    let parkType;

    if (e.target.parkType.value === "statePark") {
      parkType = [true, false];
    } else {
      parkType = [false, true];
    }

    onNewParkCreation({
      name: e.target.name.value,
      city: e.target.city.value,
      state: e.target.state.value,
      statePark: parkType[0],
      nationalPark: parkType[1]
    })
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
        <h1 id="dark-green-accent">add a new park</h1>
        <form id="add-park" onSubmit={handleNewParkFormSubmission}>
          <input
            style={textInputStyles}
            type="text"
            name="name"
            placeholder="park name"/>
          <br/>
          <input
            style={textInputStyles}
            type="text"
            name="city"
            placeholder="city name"/>
          <br/>
          <input
            style={textInputStyles}
            type="text"
            name="state"
            placeholder="state name"/>
          <br/>
          <select style={textInputStyles} id="parkType">
            <option style={center} value="statePark">state park</option>
            <option style={center} value="nationalPark">national park</option>
          </select>
          <br/><br/>
          <button type="submit">add park</button>
        </form>
        <Link to="/"><p>cancel</p></Link>
      </>
    );
  }
}

AddPark.propTypes = {
  currentUser: PropTypes.object,
  onNewParkCreation: PropTypes.func
};

export default AddPark;