import SignIn from './pages/Auth/Signin/SignIn';
import SignUp from './pages/Auth/SignUp/SignUp';
import ConfirmSignUp from './pages/Auth/SignUp/ConfirmSignUp'
import NavBar from './components/navbar/NavBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './pages/Main/Main';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/confirm" element={<ConfirmSignUp />} />
        <Route path="/main" element={<Main />} />
      </Routes>
    </Router>
    
  );
}

export default App;