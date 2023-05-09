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
  const [ready, setReady] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  
  let url = `http://localhost:5002/api/Parks?page=${page}&pageSize=${pageSize}`;

  const handleNextClick = () => {
    setPage(page + 1);
  }

  const handlePreviousClick = () => {
    if (page > 1) {
      setPage(page - 1);
    };
  }

  const handleUpdatePageSize = (newSize) => {
    setPageSize(newSize);
  }

  useEffect(() => {
    fetch(`${url}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`${response.status}: ${response.statusText}`);
        } else {
          return response.json()
        }
      })
      .then((jsonResponse) => {
        setMainParkList(jsonResponse.queriedParks)
        setReady(true)
      })
      .catch((error) => {
        setError(error)
        setReady(true)
      });
  }, [url])

  if(error) {
    return <h3>There was an error: {error.message}</h3>
  } else if (!ready) {
    return <h1>... l o a d i n g ...</h1>
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
            <FilterParks
              onUpdatePageSize={handleUpdatePageSize}/>
            <ParkList
              parkList={mainParkList}
              currentPage={page}
              onNextClick={handleNextClick}
              onPreviousClick={handlePreviousClick}/>
          </>}/>
      </Routes>
    )
  }
}

export default ParkControl;