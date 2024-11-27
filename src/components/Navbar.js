import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Sidebar from "./Sidebar"; // Import Sidebar component
import "./Navbar.css";

const Navbar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
    document.body.classList.toggle("sidebar-open", !isSidebarOpen); // Lock body scroll when sidebar is open
  };

  return (
    <nav className="navbar">
      <h2 className="navbar-title">RBAC Management</h2>
      <div className="navbar-links-container">
        <NavLink 
          to="/" 
          className={({ isActive }) => (isActive ? "navbar-link active-link" : "navbar-link")}
        >
          Dashboard
        </NavLink>
        <NavLink 
          to="/user" 
          className={({ isActive }) => (isActive ? "navbar-link active-link" : "navbar-link")}
        >
          Users
        </NavLink>
        <NavLink 
          to="/roles" 
          className={({ isActive }) => (isActive ? "navbar-link active-link" : "navbar-link")}
        >
          Roles
        </NavLink>
      </div>

      {/* Mobile Hamburger Icon */}
      <div className="hamburger-icon" onClick={toggleSidebar}>
        &#9776;
      </div>

      {/* Sidebar Component */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </nav>
  );
};

export default Navbar;
