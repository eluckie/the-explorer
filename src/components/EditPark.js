import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function EditPark(props) {
  const { park, currentUser, onParkEdit } = props;

  const textInputStyles = {
    borderColor: "rgb(150, 184, 115)",
    borderRadius: "0.7rem",
    padding: 6,
    width: 260,
    paddingTop: 8,
    fontFamily: "Braah One, sans-serif"
  }

  const center = {
    textAlign: "center"
  }

  function handleEditParkFormSubmission(e) {
    e.preventDefault();
    let name = park.name;
    let city = park.city;
    let state = park.state;
    let parkType;

    if (e.target.name.value !== "") {
      name = e.target.name.value;
    }

    if (e.target.city.value !== "") {
      city = e.target.city.value;
    }

    if (e.target.state.value !== "") {
      state = e.target.state.value;
    }

    if (e.target.parkType.value === "statePark") {
      parkType = [true, false];
    } else {
      parkType = [false, true];
    }

    onParkEdit({
      parkId: park.parkId,
      name: name,
      city: city,
      state: state,
      statePark: parkType[0],
      nationalPark: parkType[1]
    })
  }

  if (!currentUser) {
    return (
      <>
        <br/>
        <h2>whoopsies! you shouldn't be here</h2>
        <Link to="/">go home</Link>
        <br/><br/>
      </>
    );
  } else {
    return (
      <>
        <h2>
          currently editing<br/>
          <span id="dark-green-accent">{park.name}</span>
          </h2>
        <form id="edit-park" onSubmit={handleEditParkFormSubmission}>
          <input
            style={textInputStyles}
            type="text"
            name="name"
            placeholder={park.name}/>
          <br/>
          <input
            style={textInputStyles}
            type="text"
            name="city"
            placeholder={park.city}/>
          <br/>
          <input
            style={textInputStyles}
            type="text"
            name="state"
            placeholder={park.state}/>
          <br/>
          <select style={textInputStyles} id="parkType">
          {`${park.statePark}` === `${true}` ?
            <>
            <option style={center} value="statePark">state park</option>
            <option style={center} value="nationalPark">national park</option>
            </> :
            <>
              <option style={center} value="nationalPark">national park</option>
              <option style={center} value="statePark">state park</option>
            </>}
          </select>
          <br/><br/>
          <button type="submit">update</button>
        </form>
        <Link to="/details"><p>cancel</p></Link>
        <br/>
      </>
    );
  }
}

EditPark.propTypes = {
  park: PropTypes.object,
  currentUser: PropTypes.object,
  onParkEdit: PropTypes.func
};

export default EditPark;