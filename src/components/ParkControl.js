import { useState, useEffect } from "react";
import AddPark from "./AddPark";
import EditPark from "./EditPark";
import DeleteConfirmation from "./DeleteConfirmation";
import FilterParks from "./FilterParks";
import ParkList from "./ParkList";
import ParkDetails from "./ParkDetails";
import { Routes, Route, useNavigate } from "react-router-dom";

function ParkControl() {
  const [selectedPark, setSelectedPark] = useState(null);
  const [mainParkList, setMainParkList] = useState([]);
  const [error, setError] = useState(null);
  const [ready, setReady] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [matchingParkCount, setMatchingParkCount] = useState(0);
  const [natlPark, setNatlPark] = useState("");
  const [statePark, setStatePark] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  const navigate = useNavigate();

  let url = `http://localhost:5002/api/Parks?page=${page}&pageSize=${pageSize}${natlPark}${statePark}${city}${state}`;

  const handleNextClick = () => {
    setPage(page + 1);
  }

  const handlePreviousClick = () => {
    setPage(page - 1);
  }

  const handleUpdatePageSize = (newSize) => {
    setPageSize(newSize);
    setPage(1);
  }

  const handleUpdateParkType = (type) => {
    if (type === "nationalPark") {
      setNatlPark("&nationalPark=true");
      setStatePark("");
      setPage(1);
    } else {
      setStatePark("&statePark=true");
      setNatlPark("");
      setPage(1);
    };
  }

  const handleUpdateCity = (city) => {
    setCity(`&city=${city}`);
    setPage(1);
  }

  const handleUpdateState = (state) => {
    setState(`&state=${state}`);
    setPage(1);
  }

  const handleResetFilters = () => {
    setPage(1);
    setStatePark("");
    setNatlPark("");
    setCity("");
    setState("");
    document.getElementById("state-or-natl").reset();
    document.getElementById("city-search").reset();
    document.getElementById("state-search").reset();
  }

  const handleChangingSelectedPark = async (id) => {
    const selection = await mainParkList.filter(park => park.parkId === id)[0];
    setSelectedPark(selection);
    navigate("/details");
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
        setMatchingParkCount(jsonResponse.matchingParks)
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
              onUpdateParkType={handleUpdateParkType}
              onUpdateCity={handleUpdateCity}
              onUpdateState={handleUpdateState}
              onResetFilters={handleResetFilters}/>
            <ParkList
              parkList={mainParkList}
              matchingParkCount={matchingParkCount}
              currentPage={page}
              pageSize={pageSize}
              onNextClick={handleNextClick}
              onPreviousClick={handlePreviousClick}
              onUpdatePageSize={handleUpdatePageSize}
              onParkSelection={handleChangingSelectedPark}/>
          </>}/>
      </Routes>
    )
  }
}

export default ParkControl;