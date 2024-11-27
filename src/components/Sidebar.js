import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; 

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const sidebarRef = useRef(null);

  // Handle clicks outside the sidebar
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (isOpen && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        toggleSidebar(); // Close the sidebar
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, toggleSidebar]);

  return (
    <aside ref={sidebarRef} className={`sidebar ${isOpen ? "open" : ""}`}>
      <h3>Navigation</h3>
      <ul>
        <li>
          <Link to="/" onClick={toggleSidebar}>Dashboard</Link>
        </li>
        <li>
          <Link to="/user" onClick={toggleSidebar}>Users</Link>
        </li>
        <li>
          <Link to="/roles" onClick={toggleSidebar}>Roles</Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
