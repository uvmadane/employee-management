import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Button, TextField, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router';
import './EmployeeForm.css';

const EmployeeForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    emailId: '',
    mobile: '',
    country: '',
    state: '',
    district: '',
  });
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetchCountries();
    if (id) {
      fetchEmployee(id);
    }
  }, [id]);

  const fetchCountries = async () => {
    try {
      const response = await axios.get('https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/country');
      setCountries(response.data);
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };

  const fetchEmployee = async (id) => {
    try {
      const response = await axios.get(`https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee/${id}`);
      setForm(response.data);
    } catch (error) {
      console.error('Error fetching employee details:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee/${id}`, form);
      } else {
        await axios.post('https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee', form);
      }
      navigate('/');
    } catch (error) {
      console.error('Error saving employee details:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>{id ? 'Edit Employee' : 'Add Employee'}</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <TextField
          label="Email"
          name="emailId"
          type="email"
          value={form.emailId}
          onChange={handleChange}
          required
        />
        <TextField
          label="Mobile"
          name="mobile"
          value={form.mobile}
          onChange={handleChange}
          required
        />
      <TextField
        label="Country"
        name="country"
        value={form.country}
        onChange={handleChange}
        select
        SelectProps={{
          renderValue: (selected) => {
            const selectedCountry = countries.find(c => c.country === selected);
            return (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src={selectedCountry?.flag} alt={selectedCountry?.flag} style={{ width: 24, height: 24, borderRadius: '50%', marginRight: 10 }} />
                {selectedCountry?.country}
              </div>
            );
          },
        }}
      >
        {countries.map((country) => (
          <MenuItem key={country.country} value={country.country}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src={country.flag} alt={country.flag} style={{ width: 24, height: 24, borderRadius: '50%', marginRight: 10 }} />
              {country.country}
            </div>
          </MenuItem>
        ))}
        </TextField>
        <TextField
          label="State"
          name="state"
          value={form.state}
          onChange={handleChange}
          required
        />
        <TextField
          label="District"
          name="district"
          value={form.district}
          onChange={handleChange}
          required
        />
        <Button type="submit">Save</Button>
      </form>
    </div>
  );
};

export default EmployeeForm;
