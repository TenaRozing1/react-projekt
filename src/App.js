import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DataTable from './components/DataTable';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DataTable />} />
      </Routes>
    </Router>
  );
}

export default App;