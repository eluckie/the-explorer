import { useState, useEffect } from "react";
import AddPark from "./AddPark";
import EditPark from "./EditPark";
import DeleteConfirmation from "./DeleteConfirmation";
import FilterParks from "./FilterParks";
import ParkList from "./ParkList";
import ParkDetails from "./ParkDetails";
import { Routes, Route, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

function ParkControl(props) {
  const { currentUser } = props;

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
  }

  const handleClearForms = () => {
    handleResetFilters();
    document.getElementById("state-or-natl").reset();
    document.getElementById("city-search").reset();
    document.getElementById("state-search").reset();
  }

  const handleChangingSelectedPark = async (id) => {
    const selection = await mainParkList.filter(park => park.parkId === id)[0];
    setSelectedPark(selection);
    navigate("/details");
  }

  const handleAddingNewPark = async (newPark) => {
    setReady(false);

    const parkData = {
      name: newPark.name,
      city: newPark.city,
      state: newPark.state,
      statePark: newPark.statePark,
      nationalPark: newPark.nationalPark
    };

    await fetch("http://localhost:5002/api/Parks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(parkData)
    })
    .then((response) => {
      if (!response.ok) {
        const message = `An error has occurred: ${response.status}: ${response.statusText}`;
        throw new Error(message);
      }
    })
    .then(() => {
      setSelectedPark(newPark)
      setReady(true)
      navigate("/details")
    })
    .catch((error) => {
      setError(error)
      setReady(true)
    });
  }

  const handleRefreshParkList = () => {
    fetch(`${url}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`${response.status}: ${response.statusText}`);
        } else {
          return response.json()
        }
      })
      .then((jsonResponse) => {
        setSelectedPark(null)
        setMainParkList(jsonResponse.queriedParks)
        setMatchingParkCount(jsonResponse.matchingParks)
        navigate("/")
      })
      .catch((error) => {
        setError(error)
      });
  }

  const handleDeletingSelectedPark = (id) => {
    setReady(false);
    fetch(`http://localhost:5002/api/Parks/${id}`, { method: "DELETE" })
      .then(() => {
        setMainParkList(mainParkList.filter(park => park.parkId !== id));
        setMatchingParkCount(matchingParkCount - 1)
        navigate("/")
        setReady(true)
      })
      .catch((error) => {
        setError(error)
        setReady(true)
      });
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
        <Route path="/add-park" element={<AddPark
          currentUser={currentUser}
          onNewParkCreation={handleAddingNewPark}/>}/>
        <Route path="/edit-park" element={<EditPark
          park={selectedPark}
          currentUser={currentUser}/>}/>
        <Route path="/delete-park" element={<DeleteConfirmation
          park={selectedPark}
          currentUser={currentUser}
          onParkDeletion={handleDeletingSelectedPark}/>}/>
        <Route path="/details" element={<ParkDetails
          park={selectedPark}
          currentUser={currentUser}
          onCancel={handleRefreshParkList}/>}/>
        <Route path="/" element={
          <>
            <FilterParks
              onUpdateParkType={handleUpdateParkType}
              onUpdateCity={handleUpdateCity}
              onUpdateState={handleUpdateState}
              onResetFilters={handleClearForms}
              city={city}
              state={state}/>
            <ParkList
              parkList={mainParkList}
              matchingParkCount={matchingParkCount}
              currentPage={page}
              pageSize={pageSize}
              city={city}
              state={state}
              onNextClick={handleNextClick}
              onPreviousClick={handlePreviousClick}
              onUpdatePageSize={handleUpdatePageSize}
              onParkSelection={handleChangingSelectedPark}/>
          </>}/>
      </Routes>
    )
  }
}

ParkControl.propTypes = {
  currentUser: PropTypes.object
};

export default ParkControl;