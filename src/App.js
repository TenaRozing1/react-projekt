import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import DataTable from "./components/DataTable";
import DetailsPage from "./components/DetailsPage";

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Početna</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<DataTable />} />
          <Route path="/details/:id" element={<DetailsPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
