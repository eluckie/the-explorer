import PropTypes from "prop-types";

function FilterParks(props) {
  const { onUpdatePageSize, onResetFilters, onUpdateParkType } = props;

  function handleUpdatePageSize(e) {
    e.preventDefault();
    onUpdatePageSize(parseInt(e.target.page.value));
  }

  function handleUpdateParkType(e) {
    e.preventDefault();
    onUpdateParkType(e.target.parkType.value);
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
      <button onClick={onResetFilters}>clear filters</button>
    </>
  );
}

FilterParks.propTypes = {
  onUpdatePageSize: PropTypes.func,
  onResetFilters: PropTypes.func,
  onUpdateParkType: PropTypes.func
};

export default FilterParks;