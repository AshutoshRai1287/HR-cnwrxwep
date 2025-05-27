import React, { useState } from 'react';
import EmployeeList from '../components/Employees/EmployeeList';
import EmployeeForm from '../components/Employees/EmployeeForm';

const Employees: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | undefined>(undefined);
  
  const handleAddEmployee = () => {
    setSelectedEmployeeId(undefined);
    setShowForm(true);
  };
  
  const handleEditEmployee = (id: string) => {
    setSelectedEmployeeId(id);
    setShowForm(true);
  };
  
  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedEmployeeId(undefined);
  };
  
  return (
    <div>
      <EmployeeList onAdd={handleAddEmployee} onEdit={handleEditEmployee} />
      
      {showForm && (
        <EmployeeForm employeeId={selectedEmployeeId} onClose={handleCloseForm} />
      )}
    </div>
  );
};

export default Employees;