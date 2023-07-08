import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DataTable = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    address: '',
    phone: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://random-data-api.com/api/users/random_user?size=5');
      setData(response.data);
      setFilteredData(response.data);
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
    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData);
    setFilteredData(updatedData);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({
      name: '',
      email: '',
      username: '',
      address: '',
      phone: '',
    });
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Perform form validation here
    // ...

    // Add the new row to the table
    const newRow = {
      id: Date.now(),
      first_name: formData.name,
      email: formData.email,
      username: formData.username,
      address: formData.address,
      phone: formData.phone,
    };
    setFilteredData((prevData) => [...prevData, newRow]);
    handleCloseModal();
  };

  return (
    <div>
      <button onClick={handleOpenModal}>Dodaj novi redak</button>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
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
                Adresa:
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </label>

              <label>
                Telefon:
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </label>

              <button type="submit">Spremi</button>
            </form>
          </div>
        </div>
      )}

      <input type="text" placeholder="Pretraži po imenu" value={searchTerm} onChange={handleSearch} />

      <table>
        <thead>
          <tr>
            <th>Ime</th>
            <th>Email</th>
            <th>Korisničko ime</th>
            <th>Akcije</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={item.id}>
              <td>{item.first_name}</td>
              <td>{item.email}</td>
              <td>{item.username}</td>
              <td>
                <button onClick={() => handleDelete(item.id)}>Izbriši</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
