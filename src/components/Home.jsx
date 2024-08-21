import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, TextField, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import DeleteConfirmation from './DeleteConfirmation';
import './Home.css';

const Home = () => {
  const [employees, setEmployees] = useState([]);
  const [searchId, setSearchId] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteEmployeeId, setDeleteEmployeeId] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee');
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleSearch = async () => {
    if (searchId) {
      try {
        const response = await axios.get(`https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee/${searchId}`);
        setEmployees([response.data]);
      } catch (error) {
        console.error('Error fetching employee:', error);
      }
    } else {
      fetchEmployees();
    }
  };

  const openDeleteDialog = (id) => {
    setDeleteEmployeeId(id);
    setDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setDeleteEmployeeId(null);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee/${deleteEmployeeId}`);
      fetchEmployees();
      closeDeleteDialog();
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  return (
    <div className="home-container">
      <h1>Employee Management</h1>
      <div className="search-bar">
        <TextField
          label="Search by ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
        <Button onClick={handleSearch}>Search</Button>
      </div>
      <Button
        className="add-employee-button"
        component={Link}
        to="/add"
      >
        Add Employee
      </Button>
      <Table className="employee-table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Mobile</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee.id}>
              <TableCell>{employee.id}</TableCell>
              <TableCell>{employee.name}</TableCell>
              <TableCell>{employee.email}</TableCell>
              <TableCell>{employee.mobile}</TableCell>
              <TableCell>
                <div className="action-buttons">
                  <Button className="edit-button" component={Link} to={`/edit/${employee.id}`}>
                    Edit
                  </Button>
                  <Button className="delete-button" onClick={() => openDeleteDialog(employee.id)}>
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <DeleteConfirmation
        open={deleteDialogOpen}
        onClose={closeDeleteDialog}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default Home;
