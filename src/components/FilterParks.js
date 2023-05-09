import PropTypes from "prop-types";

function FilterParks(props) {
  const { onUpdatePageSize, onResetFilters, onUpdateParkType, onUpdateCity, onUpdateState } = props;

  function handleUpdatePageSize(e) {
    e.preventDefault();
    onUpdatePageSize(parseInt(e.target.page.value));
  }

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
          placeholder="search by city"/>
        <button type="submit">🔎</button>
      </form>
      <form id="state-search" onSubmit={handleUpdateState}>
        <input
          type="text"
          name="stateName"
          placeholder="search by state"/>
        <button type="submit">🔎</button>
      </form>
      <br/>
      <form id="page-size" onSubmit={handleUpdatePageSize}>
        <select id="page">
          <option value="10">10 per page</option>
          <option value="25">25 per page</option>
          <option value="50">50 per page</option>
          <option value="100">view all</option>
        </select>
        <button type="submit">apply</button>
      </form>
      <br/><br/>
      <button onClick={onResetFilters}>reset all</button>
    </>
  );
}

FilterParks.propTypes = {
  onUpdatePageSize: PropTypes.func,
  onResetFilters: PropTypes.func,
  onUpdateParkType: PropTypes.func,
  onUpdateCity: PropTypes.func,
  onUpdateState: PropTypes.func
};

export default FilterParks;