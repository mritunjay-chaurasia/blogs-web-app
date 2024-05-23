import { Routes, Route } from "react-router-dom";
import "./App.css";
import LoginPage from "./Pages/Login/Login";
import Registration from "./Pages/Registration/Registration";
import PrivateRoute from "./routes/PrivateRoute";
import Dashboard from "./Pages/Dashboard/Dashboard";


function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route exact path="/register" element={<Registration />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
