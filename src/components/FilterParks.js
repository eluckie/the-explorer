import PropTypes from "prop-types";

function FilterParks(props) {
  function handleUpdatePageSize(e) {
    e.preventDefault();
    props.onUpdatePageSize(parseInt(e.target.page.value));
  }

  return (
    <>
      <hr/>
      <h4>filters</h4>
      <form onSubmit={handleUpdatePageSize}>
        <select id="page">
          <option value="10">10 per page</option>
          <option value="25">25 per page</option>
          <option value="50">50 per page</option>
          <option value="100">view all</option>
        </select>
        <button type="submit">apply</button>
      </form>
    </>
  );
}

FilterParks.propTypes = {
  onUpdatePageSize: PropTypes.func
};

export default FilterParks;