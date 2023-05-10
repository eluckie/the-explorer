import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function EditPark(props) {
  const { park } = props;

  return (
    <>
      <h3>edit {park.name}</h3>
      <Link to="/details"><p>cancel</p></Link>
    </>
  );
}

EditPark.propTypes = {

};

export default EditPark;