import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DataTable = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

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

  return (
    <div>
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
