import { Routes, Route } from "react-router-dom";
import "./App.css";
import LoginPage from "./Pages/Login";
import Registration from "./Pages/Registration";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import Dashboard from "./Pages/Dashboard/Dashboard";


function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route exact path="/login" element={
        <PublicRoute>
          <LoginPage />
        </PublicRoute>
      } />
      <Route exact path="/register" element={
        <PublicRoute>
          <Registration />
        </PublicRoute>
      } />

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
