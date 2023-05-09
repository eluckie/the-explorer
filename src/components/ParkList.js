import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import StateIcon from "./../img/state.png";
import NatlIcon from "./../img/natl.png";

function ParkList(props) {
  const { onPreviousClick, onNextClick, parkList, currentPage, matchingParkCount, pageSize, onUpdatePageSize } = props;

  const findPagesNeeded = () => {
    const remainder = matchingParkCount % pageSize;
    if (remainder > 0) {
      return ((matchingParkCount - remainder) / pageSize) + 1;
    } else {
      return matchingParkCount / pageSize;
    }
  }

  function handleUpdatePageSize(e) {
    e.preventDefault();
    onUpdatePageSize(parseInt(e.target.page.value));
  }

  const divStyles = {
    border: "2px solid black",
    borderRadius: "0.7rem",
    width: 300,
    display: "inline-block",
    margin: "6px"
  };
  const pageNumberStyles = {
    fontSize: 24,
    display: "inline",
    padding: 10
  };

  if (parkList.length === 0) {
    return (
      <>
        <hr/>
        <Link to="/add-park"><button>add new park</button></Link>
        <br/><br/>
        <h2>there are no matching parks</h2>
        <p>
          try updating your filter parameters<br/>
          or<br/>
          click the reset all button
        </p>
      </>
    )
  } else {
    return (
      <>
        <hr/>
        <Link to="/add-park"><button>add new park</button></Link>
        <br/><br/>
        {`${currentPage}` === `${1}` ? "" : <button onClick={onPreviousClick}>&lt;</button>}
        <p style={pageNumberStyles}>{currentPage}</p>
        {`${findPagesNeeded()}` === `${currentPage}` ? "" : <button id="next-page-btn" onClick={onNextClick}>&gt;</button>}
        <br/><br/>
        {parkList.map((park) =>
          <div style={divStyles} key={park.parkId}>
            <h3>{park.name}</h3>
            <h5>{park.city}, {park.state}</h5>
            <p>
              {`${park.nationalPark}` === `${true}` ? "National Park" : "State Park"}
            </p>
            {`${park.nationalPark}` === `${true}` ? <img src={NatlIcon} alt="icon with 3 trees"/> : <img src={StateIcon} alt="tree icon"/>}
          </div>
        )}
        <br/>
        <p>{matchingParkCount} parks</p>
        <form id="page-size" onSubmit={handleUpdatePageSize}>
        <select id="page">
          <option value="10">10 per page</option>
          <option value="25">25 per page</option>
          <option value="50">50 per page</option>
          <option value="100">view all</option>
        </select>
        <button type="submit">update</button>
      </form>
      </>
    );
  }
}

ParkList.propTypes = {
  parkList: PropTypes.array,
  onPreviousClick: PropTypes.func,
  onNextClick: PropTypes.func,
  onUpdatePageSize: PropTypes.func,
  currentPage: PropTypes.number
};

export default ParkList;