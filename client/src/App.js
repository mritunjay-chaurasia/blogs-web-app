import logo from "./logo.svg";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import LoginPage from "./Pages/Login";
import Registration from "./Pages/Registration";
// import CustomizedMenus from './components/Test'
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LoginPage />}  />
        <Route exact path="/register" element={<Registration />}  />
      </Routes>
      
    </Router>
  );
}

export default App;
