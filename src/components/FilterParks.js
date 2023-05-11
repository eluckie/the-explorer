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

  return (
    <>
      <hr/>
      <h4>filters</h4>
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
      <br/>
      <form id="city-search" onSubmit={handleUpdateCity}>
        <input
          type="text"
          name="cityName"
          placeholder={`${city}` ? `${cityName}` : "search by city"}/>
        <button type="submit">🔎</button>
      </form>
      <form id="state-search" onSubmit={handleUpdateState}>
        <input
          type="text"
          name="stateName"
          placeholder={`${state}` ? `${stateName}` : "search by state"}/>
        <button type="submit">🔎</button>
      </form>
      <br/><br/>
      <button onClick={onResetFilters}>reset all</button>
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