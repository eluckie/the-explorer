import PropTypes from "prop-types";
import Park from "./Park";

function ParkList(props) {
  const { onPreviousClick, onNextClick, parkList, currentPage, matchingParkCount, pageSize, onUpdatePageSize, onParkSelection, city, state } = props;

  const cityName = city.slice(6);
  const stateName = state.slice(7);

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
    border: "2px solid rgb(135, 104, 62)",
    borderRadius: "0.7rem",
    width: 300,
    display: "inline-block",
    margin: "6px"
  }

  const pageNumberStyles = {
    fontSize: 24,
    display: "inline",
    padding: 10,
    fontWeight: "bold"
  }

  const buttonStyles = {
    backgroundColor: "rgb(135, 104, 62)",
    borderColor: "rgb(135, 104, 62)"
  }

  const matchingParkStyles = {
    color: "rgb(135, 104, 62)",
    fontSize: 12
  }

  const perPageStyles = {
    borderColor: "rgb(135, 104, 62)",
    borderRadius: "0.7rem",
    padding: 6,
    paddingTop: 8,
    fontFamily: "Braah One, sans-serif",
    textAlign: "center"
  }

  if (parkList.length === 0) {
    return (
      <>
        <br/>
        <h2>
          there are no matching parks in<br/>
          <span id="dark-green-accent">
            {`${city}` && `${state}` ? `${cityName}, ${stateName}` : `${cityName} ${stateName}`}
          </span>
        </h2>
        <p style={matchingParkStyles}>
          try updating your filter parameters<br/>
          or<br/>
          click the reset all button
        </p>
        <br/><br/>
      </>
    )
  } else {
    return (
      <>
        <br/>
        {`${currentPage}` === `${1}` ? "" : <button style={buttonStyles} onClick={onPreviousClick}>&lt;</button>}
        <p style={pageNumberStyles}>{currentPage}</p>
        {`${findPagesNeeded()}` === `${currentPage}` ? "" : <button style={buttonStyles} id="next-page-btn" onClick={onNextClick}>&gt;</button>}
        <br/><br/>
        {parkList.map((park) =>
          <div style={divStyles} key={park.parkId}>
            <Park
              whenParkClicked={onParkSelection}
              parkId={park.parkId}
              name={park.name}
              city={park.city}
              state={park.state}
              nationalPark={park.nationalPark}
              statePark={park.statePark}/>
          </div>
        )}
        <br/>
        <p id="accent-font" style={matchingParkStyles}>{matchingParkCount} parks</p>
        <form id="page-size" onSubmit={handleUpdatePageSize}>
          <select style={perPageStyles} id="page">
            <option value="10">10 per page</option>
            <option value="25">25 per page</option>
            <option value="50">50 per page</option>
            <option value="100">view all</option>
          </select>
          <button style={buttonStyles} type="submit">update</button>
        </form>
        <br/>
      </>
    );
  }
}

ParkList.propTypes = {
  parkList: PropTypes.array,
  onPreviousClick: PropTypes.func,
  onNextClick: PropTypes.func,
  onUpdatePageSize: PropTypes.func,
  onParkSelection: PropTypes.func,
  currentPage: PropTypes.number,
  pageSize: PropTypes.number,
  matchingParkCount: PropTypes.number,
  city: PropTypes.string,
  state: PropTypes.string
};

export default ParkList;