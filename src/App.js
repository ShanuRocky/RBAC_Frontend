import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/User";
import Roles from "./pages/Roles";
import NavBar from "./components/Navbar"; 

function App() {
  return (
    <Router>
      <NavBar /> {/* Display NavBar on all pages */}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/user" element={<Users />} />
        <Route path="/roles" element={<Roles />} />
      </Routes>
    </Router>
  );
}

export default App;
