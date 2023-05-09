import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import StateIcon from "./../img/state.png";
import NatlIcon from "./../img/natl.png";

function ParkList(props) {
  const { onPreviousClick, onNextClick, parkList, currentPage } = props;

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

  return (
    <>
      <hr/>
      <Link to="/add-park"><button>add new park</button></Link>
      <br/><br/>
      <button onClick={onPreviousClick}>&lt;</button>
      <p style={pageNumberStyles}>{currentPage}</p>
      <button onClick={onNextClick}>&gt;</button>
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
    </>
  );
}

ParkList.propTypes = {
  parkList: PropTypes.array,
  onPreviousClick: PropTypes.func,
  onNextClick: PropTypes.func,
  currentPage: PropTypes.number
};

export default ParkList;