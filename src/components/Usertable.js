import React from "react";
const UserTable = ({ users, onEdit, onDelete, onSort }) => {
  return (
    <div className="table-wrapper"> {/* Wrapper for horizontal scrolling */}
      <table className="user-table">
        <thead>
          <tr>
            <th onClick={() => onSort("id")}>ID</th>
            <th onClick={() => onSort("name")}>Name</th>
            <th onClick={() => onSort("email")}>Email</th>
            <th onClick={() => onSort("roles")}>Roles</th>
            <th onClick={() => onSort("status")}>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.roles.join(", ")}</td>
              <td>{user.status}</td>
              <td>
                <button className="edit" onClick={() => onEdit(user)}>
                  Edit
                </button>
                <button className="delete" onClick={() => onDelete(user.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
