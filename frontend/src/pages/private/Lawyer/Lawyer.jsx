import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Lawyer.css";

const Lawyer = () => {
  const [lawyers, setLawyers] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [editingLawyer, setEditingLawyer] = useState(null);
  const [editData, setEditData] = useState({});
  const lawyersPerPage = 10;

  // Fetch lawyers (replace API with your backend endpoint)
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users") // placeholder
      .then((res) => {
        const lawyerList = res.data.map((u) => ({
          ...u,
          phone: u.phone || "N/A",
          email: u.email,
          specialization: "General Law", // example field
          casesHandled: Math.floor(Math.random() * 50), // fake data
          status: "Active",
        }));
        setLawyers(lawyerList);
      })
      .catch((err) => console.error(err));
  }, []);

  // Search filter
  const filteredLawyers = lawyers.filter(
    (lawyer) =>
      lawyer.name.toLowerCase().includes(search.toLowerCase()) ||
      lawyer.email.toLowerCase().includes(search.toLowerCase()) ||
      lawyer.specialization.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination
  const indexOfLast = currentPage * lawyersPerPage;
  const indexOfFirst = indexOfLast - lawyersPerPage;
  const currentLawyers = filteredLawyers.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredLawyers.length / lawyersPerPage);

  // Delete
  const handleDelete = (id) => {
    setLawyers(lawyers.filter((lawyer) => lawyer.id !== id));
  };

  // Edit
  const handleEdit = (lawyer) => {
    setEditingLawyer(lawyer.id);
    setEditData({ ...lawyer });
  };

  const handleSave = (id) => {
    setLawyers(
      lawyers.map((l) => (l.id === id ? { ...l, ...editData } : l))
    );
    setEditingLawyer(null);
  };

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  return (
    <div className="lawyers-dashboard">
      {/* Header */}
      <div className="lawyers-header">
        <h2>Lawyer Management</h2>
        <a href="/signup">
          <button className="btn add-lawyer">+ Add Lawyer</button>
        </a>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by name, email, or specialization..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      {/* Table */}
      <table className="lawyers-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Specialization</th>
            <th>Cases Handled</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentLawyers.map((lawyer, index) => (
            <tr key={lawyer.id}>
              <td>{indexOfFirst + index + 1}</td>

              <td>
                {editingLawyer === lawyer.id ? (
                  <input
                    type="text"
                    name="name"
                    value={editData.name}
                    onChange={handleChange}
                  />
                ) : (
                  lawyer.name
                )}
              </td>

              <td>
                {editingLawyer === lawyer.id ? (
                  <input
                    type="text"
                    name="email"
                    value={editData.email}
                    onChange={handleChange}
                  />
                ) : (
                  lawyer.email
                )}
              </td>

              <td>
                {editingLawyer === lawyer.id ? (
                  <input
                    type="text"
                    name="phone"
                    value={editData.phone}
                    onChange={handleChange}
                  />
                ) : (
                  lawyer.phone
                )}
              </td>

              <td>
                {editingLawyer === lawyer.id ? (
                  <input
                    type="text"
                    name="specialization"
                    value={editData.specialization}
                    onChange={handleChange}
                  />
                ) : (
                  lawyer.specialization
                )}
              </td>

              <td>
                {editingLawyer === lawyer.id ? (
                  <input
                    type="number"
                    name="casesHandled"
                    value={editData.casesHandled}
                    onChange={handleChange}
                  />
                ) : (
                  lawyer.casesHandled
                )}
              </td>

              <td>
                {editingLawyer === lawyer.id ? (
                  <select
                    name="status"
                    value={editData.status}
                    onChange={handleChange}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                ) : (
                  lawyer.status
                )}
              </td>

              <td>
                {editingLawyer === lawyer.id ? (
                  <>
                    <button
                      className="btn save"
                      onClick={() => handleSave(lawyer.id)}
                    >
                      Save
                    </button>
                    <button
                      className="btn cancel"
                      onClick={() => setEditingLawyer(null)}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="btn edit"
                      onClick={() => handleEdit(lawyer)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn delete"
                      onClick={() => handleDelete(lawyer.id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}

          {currentLawyers.length === 0 && (
            <tr>
              <td colSpan="8">No lawyers found</td>
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

export default Lawyer;
