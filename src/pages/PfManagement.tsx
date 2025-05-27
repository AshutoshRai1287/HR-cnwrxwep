import React, { useState } from 'react';
import PfList from '../components/PF/PfList';
import PfForm from '../components/PF/PfForm';

const PfManagement: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | undefined>(undefined);
  
  const handleAddPf = () => {
    setSelectedEmployeeId(undefined);
    setShowForm(true);
  };
  
  const handleEditPf = (id: string) => {
    setSelectedEmployeeId(id);
    setShowForm(true);
  };
  
  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedEmployeeId(undefined);
  };
  
  return (
    <div>
      <PfList onAdd={handleAddPf} onEdit={handleEditPf} />
      
      {showForm && (
        <PfForm employeeId={selectedEmployeeId} onClose={handleCloseForm} />
      )}
    </div>
  );
};

export default PfManagement;