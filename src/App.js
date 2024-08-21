import React from 'react';
import {  Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import EmployeeDetails from './components/EmployeeDetails';
import EmployeeForm from './components/EmployeeForm';

const App = () => {
  return (
    <Routes>
        <Route  path="/" element={<Home/>} />
        <Route  path="/add" element={<EmployeeForm/>} />
        <Route  path="/edit/:id" element={<EmployeeForm/>} />
        <Route  path="/employee/:id" element={<EmployeeDetails/>} />
    </Routes>
  );
};

export default App;
