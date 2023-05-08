import { useState } from "react";

function ParkControl() {
  const [editing, setEditing] = useState(false);
  const [selectedPark, setSelectedPark] = useState(null);
  const [mainParkList, setMainParkList] = useState([]);
  const [error, setError] = useState(null);

  return (
    <>
      <h1>park control placeholder</h1>
    </>
  );
}

export default ParkControl;