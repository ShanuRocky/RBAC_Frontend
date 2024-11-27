import React, { useState } from "react";
import UserTable from "../components/Usertable";
import "./Users.css"; // Import CSS for styling

const Users = () => {
    const [users, setUsers] = useState([
        { id: 1, name: "Admin", email: "admin@example.com", roles: ["Admin"], status: "Active" },
        { id: 2, name: "John Smith", email: "john.smith@example.com", roles: ["User"], status: "Active" },
        { id: 3, name: "Jane Doe", email: "jane.doe@example.com", roles: ["Admin", "Manager"], status: "Inactive" },
    ]);

    const [searchQuery, setSearchQuery] = useState(""); // State for search query
    const [newUser, setNewUser] = useState({ name: "", email: "", roles: "", status: "Active" });
    const [isEditing, setIsEditing] = useState(false);
    const [editingUserId, setEditingUserId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [sortField, setSortField] = useState(null);
    const [sortDirection, setSortDirection] = useState("asc");

    // Filtered users based on the search query
    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.roles.some((role) => role.toLowerCase().includes(searchQuery.toLowerCase())) ||
        user.status.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Sorting function
    const handleSort = (field) => {
        const direction = sortField === field && sortDirection === "asc" ? "desc" : "asc";
        setSortField(field);
        setSortDirection(direction);

        const sortedUsers = [...users].sort((a, b) => {
            if (field === "roles") {
                return direction === "asc"
                    ? a.roles.join(", ").localeCompare(b.roles.join(", "))
                    : b.roles.join(", ").localeCompare(a.roles.join(", "));
            } else if (typeof a[field] === "string") {
                return direction === "asc"
                    ? a[field].localeCompare(b[field])
                    : b[field].localeCompare(a[field]);
            } else {
                return direction === "asc" ? a[field] - b[field] : b[field] - a[field];
            }
        });

        setUsers(sortedUsers);
    };

    // Handle add or edit user
    const handleAdd = () => {
        if (!newUser.name || !newUser.email || !newUser.roles) {
            alert("Please fill out all fields!");
            return;
        }

        if (isEditing) {
            setUsers(
                users.map((user) =>
                    user.id === editingUserId
                        ? { ...user, ...newUser, roles: newUser.roles.split(",") }
                        : user
                )
            );
            setIsEditing(false);
            setEditingUserId(null);
        } else {
            const newId = users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1;
            setUsers([
                ...users,
                { id: newId, name: newUser.name, email: newUser.email, roles: newUser.roles.split(","), status: newUser.status },
            ]);
        }

        setNewUser({ name: "", email: "", roles: "", status: "Active" });
        setShowModal(false);
    };

    // Handle edit user
    const handleEdit = (user) => {
        setIsEditing(true);
        setEditingUserId(user.id);
        setNewUser({ name: user.name, email: user.email, roles: user.roles.join(","), status: user.status });
        setShowModal(true);
    };

    // Handle delete user
    const handleDelete = (id) => {
        setUsers(users.filter((user) => user.id !== id));
    };

    return (
        <div className="container">
            <h1>User Management</h1>

            {/* Search Bar */}
            <input
                type="text"
                className="search-bar"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />

            {/* Add User Button */}
            <button className="primary" onClick={() => setShowModal(true)}>
                Add New User
            </button>

            {/* User Table */}
            <UserTable
                users={filteredUsers}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onSort={handleSort} // Ensure the onSort is passed here
            />

            {/* Modal */}
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>{isEditing ? "Edit User" : "Add New User"}</h3>
                        <input
                            type="text"
                            placeholder="Name"
                            value={newUser.name}
                            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={newUser.email}
                            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Roles (comma-separated)"
                            value={newUser.roles}
                            onChange={(e) => setNewUser({ ...newUser, roles: e.target.value })}
                        />
                        <select
                            value={newUser.status}
                            onChange={(e) => setNewUser({ ...newUser, status: e.target.value })}
                        >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                        <button className="primary" onClick={handleAdd}>
                            {isEditing ? "Update User" : "Add User"}
                        </button>
                        <button
                            className="cancel"
                            onClick={() => {
                                setShowModal(false);
                                setIsEditing(false);
                                setNewUser({ name: "", email: "", roles: "", status: "Active" });
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Users;
