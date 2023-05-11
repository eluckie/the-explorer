import PropTypes from "prop-types";

function FilterParks(props) {
  const { onResetFilters, onUpdateParkType, onUpdateCity, onUpdateState, city, state } = props;

  const cityName = city.slice(6);
  const stateName = state.slice(7);

  function handleUpdateParkType(e) {
    e.preventDefault();
    onUpdateParkType(e.target.parkType.value);
  }

  function handleUpdateCity(e) {
    e.preventDefault();
    onUpdateCity((e.target.cityName.value).toLowerCase());
  }

  function handleUpdateState(e) {
    e.preventDefault();
    onUpdateState((e.target.stateName.value).toLowerCase());
  }

  const titleStyles = {
    textAlign: "left",
    margin: 20,
    color: "rgb(135, 104, 62)"
  }

  const filterFormStyles = {
    display: "inline-block",
    paddingLeft: 40,
    paddingRight: 30
  }

  const searchButtonStyles = {
    backgroundColor: "white",
    border: "none"
  }

  const divStyles = {
    width: 640,
    margin: "auto"
  }

  const textInputStyles = {
    borderColor: "rgb(150, 184, 115)",
    borderRadius: "0.7rem",
    padding: 6
  }

  return (
    <>
      <div style={divStyles}>
      <h4 style={titleStyles}>filters</h4>
      <div>
        <div style={filterFormStyles}>
          <form id="state-or-natl" onSubmit={handleUpdateParkType}>
            <label>
              <input type="radio" name="parkType" value="nationalPark" defaultChecked/>
              National Parks
            </label><br />
            <label>
              <input type="radio" name="parkType" value="statePark"/>
              State Parks
            </label><br />
            <button type="submit">apply</button>
          </form>
        </div>
        <div style={filterFormStyles}>
          <form id="city-search" onSubmit={handleUpdateCity}>
            <input
              style={textInputStyles}
              type="text"
              name="cityName"
              placeholder="search by city"
              defaultValue={`${city}` ? `${cityName}` : ""}/>
            <button style={searchButtonStyles} type="submit">🔎</button>
          </form>
          <form id="state-search" onSubmit={handleUpdateState}>
            <input
              style={textInputStyles}
              type="text"
              name="stateName"
              placeholder="search by state"
              defaultValue={`${state}` ? `${stateName}` : ""}/>
            <button style={searchButtonStyles} type="submit">🔎</button>
          </form>
        </div>
      </div>
      <br/>
      <button onClick={onResetFilters}>reset all</button>
      </div>
      <br/>
      <hr/>
    </>
  );
}

FilterParks.propTypes = {
  onResetFilters: PropTypes.func,
  onUpdateParkType: PropTypes.func,
  onUpdateCity: PropTypes.func,
  onUpdateState: PropTypes.func,
  city: PropTypes.string,
  state: PropTypes.string
};

export default FilterParks;