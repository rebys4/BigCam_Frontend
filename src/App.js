import SignIn from './pages/Auth/Signin/SignIn';
import SignUp from './pages/Auth/SignUp/SignUp';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './pages/Main/Main';
import MenuRoom from './components/Rooms/MenuRoom';
import Profile from './pages/Profile/profile';
import RemotePage from "./pages/RemotePage/RemotePage";
import { UserProvider } from './http/UserContext/UserContext';


function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          <Route path="/main" element={<Main />} />
          <Route path="/profile" element={<Profile />} />
          <Route path='/menuroom' element={<MenuRoom />} />
          <Route path='/remotePage' element={<RemotePage />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;