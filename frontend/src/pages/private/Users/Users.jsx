import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Users.css";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [editingUser, setEditingUser] = useState(null);
  const [editData, setEditData] = useState({});
  const usersPerPage = 12;

  // Fetch users (dummy API for now)
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        // Extend API data with fake extra fields
        const extendedUsers = res.data.map((u) => ({
          ...u,
          phone: u.phone || "N/A",
          address: u.address?.street || "Unknown Address",
          case: "Case-" + u.id, // fake case number
          role: u.id % 2 === 0 ? "Client" : "Lawyer",
          status: "Active",
        }));
        setUsers(extendedUsers);
      })
      .catch((err) => console.error(err));
  }, []);

  // Search filter
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  // Delete user
  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  // Edit user
  const handleEdit = (user) => {
    setEditingUser(user.id);
    setEditData({ ...user }); // copy all fields
  };

  // Save edits
  const handleSave = (id) => {
    setUsers(
      users.map((u) => (u.id === id ? { ...u, ...editData } : u))
    );
    setEditingUser(null);
  };

  // Handle input changes
  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  return (
    <div className="users-dashboard">
      {/* Header */}
      <div className="users-header">
        <h2>User Management</h2>
        <a href="/signup">
          <button className="btn add-user">+ Add User</button>
        </a>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by name or email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      {/* Table */}
      <table className="users-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Case</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user, index) => (
            <tr key={user.id}>
              <td>{indexOfFirstUser + index + 1}</td>

              {/* Editable Name */}
              <td>
                {editingUser === user.id ? (
                  <input
                    type="text"
                    name="name"
                    value={editData.name}
                    onChange={handleChange}
                  />
                ) : (
                  user.name
                )}
              </td>

              {/* Editable Email */}
              <td>
                {editingUser === user.id ? (
                  <input
                    type="text"
                    name="email"
                    value={editData.email}
                    onChange={handleChange}
                  />
                ) : (
                  user.email
                )}
              </td>

              {/* Editable Phone */}
              <td>
                {editingUser === user.id ? (
                  <input
                    type="text"
                    name="phone"
                    value={editData.phone}
                    onChange={handleChange}
                  />
                ) : (
                  user.phone
                )}
              </td>

              {/* Editable Address */}
              <td>
                {editingUser === user.id ? (
                  <input
                    type="text"
                    name="address"
                    value={editData.address}
                    onChange={handleChange}
                  />
                ) : (
                  user.address
                )}
              </td>

              {/* Editable Case */}
              <td>
                {editingUser === user.id ? (
                  <input
                    type="text"
                    name="case"
                    value={editData.case}
                    onChange={handleChange}
                  />
                ) : (
                  user.case
                )}
              </td>

              {/* Editable Role */}
              <td>
                {editingUser === user.id ? (
                  <select
                    name="role"
                    value={editData.role}
                    onChange={handleChange}
                  >
                    <option value="Client">Client</option>
                    <option value="Lawyer">Lawyer</option>
                    <option value="Admin">Admin</option>
                  </select>
                ) : (
                  user.role
                )}
              </td>

              {/* Editable Status */}
              <td>
                {editingUser === user.id ? (
                  <select
                    name="status"
                    value={editData.status}
                    onChange={handleChange}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                ) : (
                  user.status
                )}
              </td>

              <td>
                {editingUser === user.id ? (
                  <>
                    <button
                      className="btn save"
                      onClick={() => handleSave(user.id)}
                    >
                      Save
                    </button>
                    <button
                      className="btn cancel"
                      onClick={() => setEditingUser(null)}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="btn edit"
                      onClick={() => handleEdit(user)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn delete"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}

          {currentUsers.length === 0 && (
            <tr>
              <td colSpan="9">No users found</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Prev
        </button>
        <span>
          Page {currentPage} of {totalPages || 1}
        </span>
        <button
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Users;
