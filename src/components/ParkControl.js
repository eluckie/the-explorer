import { useState, useEffect } from "react";
import AddPark from "./AddPark";
import EditPark from "./EditPark";
import DeleteConfirmation from "./DeleteConfirmation";
import FilterParks from "./FilterParks";
import ParkList from "./ParkList";
import ParkDetails from "./ParkDetails";
import { Routes, Route } from "react-router-dom";

function ParkControl() {
  const [selectedPark, setSelectedPark] = useState(null);
  const [mainParkList, setMainParkList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5002/api/Parks")
      .then(response => {
        if (!response.ok) {
          throw new Error(`${response.status}: ${response.statusText}`);
        } else {
          return response.json()
        }
      })
      .then((jsonResponse) => {
        setMainParkList(jsonResponse.queriedParks)
      })
      .catch((error) => {
        setError(error)
      });
  }, [])

  if(error) {
    return (
      <>
        <h3>There was an error: {error.message}</h3>
      </>
    );
  } else {
    return (
      <Routes>
        <Route path="/add-park" element={<AddPark/>}/>
        <Route path="/edit-park" element={<EditPark
          park={selectedPark}/>}/>
        <Route path="/delete-park" element={<DeleteConfirmation
          park={selectedPark}/>}/>
        <Route path="/details" element={<ParkDetails
          park={selectedPark}/>}/>
        <Route path="/" element={
          <>
            <FilterParks/>
            <ParkList
              parkList={mainParkList}/>
          </>}/>
      </Routes>
    )
  }
}

export default ParkControl;