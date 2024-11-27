import React, { useState } from "react";
import "./RolePermissions.css"; 

const RolePermissions = () => {
  const [roles, setRoles] = useState([
    { id: 1, name: "Admin", permissions: ["Read", "Write", "Delete"] },
    { id: 2, name: "Editor", permissions: ["Read", "Write"] },
    { id: 3, name: "Viewer", permissions: ["Read"] },
  ]);
  const [newRole, setNewRole] = useState({ name: "", permissions: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingRoleId, setEditingRoleId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const handleAddOrUpdateRole = () => {
    if (!newRole.name || newRole.permissions.trim() === "") {
      alert("Please provide a role name and enter at least one permission!");
      return;
    }

    const permissionsArray = newRole.permissions.split(",").map((perm) => perm.trim());

    if (isEditing) {
      setRoles(
        roles.map((role) =>
          role.id === editingRoleId
            ? { ...role, name: newRole.name, permissions: permissionsArray }
            : role
        )
      );
      setIsEditing(false);
      setEditingRoleId(null);
    } else {
      const newId = roles.length > 0 ? Math.max(...roles.map((r) => r.id)) + 1 : 1;
      setRoles([
        ...roles,
        { id: newId, name: newRole.name, permissions: permissionsArray },
      ]);
    }

    setNewRole({ name: "", permissions: "" });
    setIsModalOpen(false); 
  };

  const handleEditRole = (role) => {
    setIsEditing(true);
    setEditingRoleId(role.id);
    setNewRole({ name: role.name, permissions: role.permissions.join(", ") });
    setIsModalOpen(true);
  };

  const handleDeleteRole = (id) => {
    setRoles(roles.filter((role) => role.id !== id));
  };

  const handlePermissionChange = (e) => {
    setNewRole((prevRole) => ({
      ...prevRole,
      permissions: e.target.value,
    }));
  };

  const filteredRoles = roles.filter(
    (role) =>
      role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.permissions.some((permission) =>
        permission.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  const sortedRoles = [...filteredRoles].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const directionMultiplier = sortConfig.direction === "asc" ? 1 : -1;
    if (a[sortConfig.key] < b[sortConfig.key]) return -1 * directionMultiplier;
    if (a[sortConfig.key] > b[sortConfig.key]) return 1 * directionMultiplier;
    return 0;
  });

  const handleSort = (key) => {
    setSortConfig((prevConfig) => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === "asc" ? "desc" : "asc",
    }));
  };

  return (
    <div className="container">
      <h1>Permission Management</h1>
      <div className="search-container">
        <input
          type="text"
          className="input-field"
          placeholder="Search by role name or permission..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <button className="button-primary" onClick={() => setIsModalOpen(true)}>
        Add New Role
      </button>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>{isEditing ? "Edit Role" : "Add New Role"}</h3>
            <input
              className="input-field"
              type="text"
              placeholder="Role Name"
              value={newRole.name}
              onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
            />
            <div className="permissions-container">
              <h4>Enter Permissions (comma-separated):</h4>
              <input
                className="input-field"
                type="text"
                placeholder="Read, Write, Delete"
                value={newRole.permissions}
                onChange={handlePermissionChange}
              />
            </div>
            <div className="button-container">
              <button className="button-primary" onClick={handleAddOrUpdateRole}>
                {isEditing ? "Update Role" : "Add Role"}
              </button>
              <button
                className="button-secondary"
                onClick={() => {
                  setIsModalOpen(false);
                  setIsEditing(false);
                  setEditingRoleId(null);
                  setNewRole({ name: "", permissions: "" });
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="role-table-container">
        <table className="role-table">
          <thead>
            <tr>
              <th onClick={() => handleSort("name")}>
                Role Name {sortConfig.key === "name" ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}
              </th>
              <th>Permissions</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedRoles.length > 0 ? (
              sortedRoles.map((role) => (
                <tr key={role.id}>
                  <td>{role.name}</td>
                  <td>{role.permissions.join(", ")}</td>
                  <td>
                    <button className="button-edit" onClick={() => handleEditRole(role)}>
                      Edit
                    </button>
                    <button
                      className="button-delete"
                      onClick={() => handleDeleteRole(role.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No roles match your search</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RolePermissions;
