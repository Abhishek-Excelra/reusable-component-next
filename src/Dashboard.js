// Dashboard.js
import React, { useContext, useEffect, useState } from 'react';
import axios from './axiosConfig';
import { AuthContext } from './AuthContext';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const isAuthenticated = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => { // Added opening curly brace here
      try {
        const response = await axios.get('/api/data');
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    }; // Closing the function definition here

    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  return (
    <div>
      {data.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
};

export default Dashboard;
