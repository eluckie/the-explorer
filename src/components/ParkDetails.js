import { Link } from "react-router-dom";

function ParkDetails() {
  return (
    <>
      <h3>park details placeholder</h3>
      <Link to="/edit-park"><button>edit park</button></Link>
      <Link to="/delete-park"><button>delete park</button></Link>
      <br/><br/>
      <Link to="/">back to list</Link>
      <br/><br/>
    </>
  );
}

export default ParkDetails;