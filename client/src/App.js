import { Routes, Route } from "react-router-dom";
import "./App.css";
import LoginPage from "./Pages/Login";
import Registration from "./Pages/Registration";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={
        <PublicRoute>
          <LoginPage />
        </PublicRoute>
      } />
      <Route exact path="/register" element={
        <PublicRoute>
          <Registration />
        </PublicRoute>
      } />
      {/* <Route
          path="/private"
          element={
            <PrivateRoute>
              <PrivatePage />
            </PrivateRoute>
          }
        /> */}
    </Routes>
  );
}

export default App;
