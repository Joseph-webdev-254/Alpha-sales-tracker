import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "./components/welcome/Welcome";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import User from "./components/User/User";
import Create from "./components/admin/Create";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user" element={<User />} />
          <Route path="/admin" element={<Create />} />
        </Routes>
      </Router>
    </>
  );
}
export default App;
