import SignIn from './pages/Auth/Signin/SignIn';
import SignUp from './pages/Auth/SignUp/SignUp';
import ConfirmSignUp from './pages/Auth/SignUp/ConfirmSignUp'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './pages/Main/Main';
import GymZoneMap from './components/Rooms/gymZone';
import MenuRoom from './components/Rooms/MenuRoom';
import Profile from './pages/Profile/profile';
import RemotePage from "./pages/RemotePage/RemotePage";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/confirm" element={<ConfirmSignUp />} />

        <Route path="/main" element={<Main />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/gymzone" element={<GymZoneMap />} />
        <Route path='/menuroom' element={<MenuRoom />} />
        <Route path='/remotePage' element={<RemotePage />} />
      </Routes>
    </Router>
    
  );
}

export default App;