import Header from './Header';
import Footer from './Footer';
import ParkControl from './ParkControl';
import SignIn from './SignIn';
import SignUp from './SignUp';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/sign-in" element={<SignIn/>}/>
        <Route path="/sign-up" element={<SignUp/>}/>
        <Route path="/" element={<ParkControl
          user={currentUser}/>}/>
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
