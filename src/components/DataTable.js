import React, { useState, useEffect } from "react";
import { useParams, useLocation, Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import "./DataTable.css";
import DetailsPage from "./DetailsPage";

const DataTable = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    city: "",
    country: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://random-data-api.com/api/users/random_user?size=5"
      );
      const updatedData = response.data.map((item) => ({
        ...item,
        city: item.address.city,
        country: item.address.country,
      }));
      setData(updatedData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    const filtered = data.filter((item) => {
      if (item.first_name && value) {
        return item.first_name.toLowerCase().includes(value.toLowerCase());
      }
      return false;
    });
    setFilteredData(filtered);
  };

  const handleDelete = (id) => {
    const updatedData = filteredData.filter((item) => item.id !== id);
    setFilteredData(updatedData);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({
      name: "",
      email: "",
      username: "",
      city: "",
      country: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const newRow = {
      id: Date.now(),
      first_name: formData.name,
      email: formData.email,
      username: formData.username,
      city: formData.city,
      country: formData.country,
    };
    setFilteredData((prevData) => [...prevData, newRow]);
    handleCloseModal();
  };

  const handleRowClick = (id) => {
    navigate(`/details/${id}`);
  };

  return (
    <div>
      <button className="add-button" onClick={handleOpenModal}>
        Dodaj novi redak
      </button>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            <h2>Unesite podatke</h2>
            <form onSubmit={handleFormSubmit}>
              <label>
                Ime:
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </label>

              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </label>

              <label>
                Korisničko ime:
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                />
              </label>

              <label>
                Grad:
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                />
              </label>

              <label>
                Država:
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                />
              </label>

              <button type="submit">Spremi</button>
            </form>
          </div>
        </div>
      )}

      <div className="search-container">
        <input
          type="text"
          placeholder="Pretraži po imenu"
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>Ime</th>
            <th>Email</th>
            <th>Korisničko ime</th>
            <th>Grad</th>
            <th>Država</th>
            <th>Brisanje</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={item.id} onClick={() => handleRowClick(item.id)}>
              <td>{item.first_name}</td>
              <td>{item.email}</td>
              <td>{item.username}</td>
              <td>{item.city}</td>
              <td>{item.country}</td>
              <td>
                <button
                  className="delete-button text-center"
                  onClick={(event) => {
                    event.stopPropagation();
                    handleDelete(item.id);
                  }}
                >
                  Izbriši
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {location.pathname.includes('/details/') && (
        <DetailsPage data={filteredData} />
      )}
    </div>
  );
};

export default DataTable;
