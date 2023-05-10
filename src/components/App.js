import Header from './Header';
import Footer from './Footer';
import ParkControl from './ParkControl';
import SignIn from './SignIn';
import SignUp from './SignUp';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  const handleSettingCurrentUser = (user) => {
    setCurrentUser(user);
  }

  return (
    <Router>
      <Header
        currentUser={currentUser}
        setCurrentUser={handleSettingCurrentUser}/>
      <Routes>
        <Route path="/sign-in" element={<SignIn
          setCurrentUser={handleSettingCurrentUser}/>}/>
        <Route path="/sign-up" element={<SignUp
          setCurrentUser={handleSettingCurrentUser}/>}/>
        <Route path="*" element={<ParkControl
          user={currentUser}/>}/>
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
