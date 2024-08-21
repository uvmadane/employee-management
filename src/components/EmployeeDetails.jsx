import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { Button, Typography } from '@mui/material';

const EmployeeDetails = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    fetchEmployee();
  }, [id]);

  const fetchEmployee = async () => {
    try {
      const response = await axios.get(`https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee/51`);
      setEmployee(response.data);
    } catch (error) {
      console.error('Error fetching employee details:', error);
    }
  };

  return (
    <div>
      {employee ? (
        <>
          <Typography variant="h4">{employee.name}</Typography>
          <Typography>Email: {employee.email}</Typography>
          <Typography>Mobile: {employee.mobile}</Typography>
          <Typography>Country: {employee.country}</Typography>
          <Typography>State: {employee.state}</Typography>
          <Typography>District: {employee.district}</Typography>
          <Button component={Link} to={`/edit/${employee.id}`}>Edit</Button>
        </>
      ) : (
        <Typography>Loading...</Typography>
      )}
    </div>
  );
};

export default EmployeeDetails;
