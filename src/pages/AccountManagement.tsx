import React, { useState } from 'react';
import AccountList from '../components/Accounts/AccountList';
import AccountForm from '../components/Accounts/AccountForm';

const AccountManagement: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | undefined>(undefined);
  
  const handleAddAccount = () => {
    setSelectedEmployeeId(undefined);
    setShowForm(true);
  };
  
  const handleEditAccount = (id: string) => {
    setSelectedEmployeeId(id);
    setShowForm(true);
  };
  
  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedEmployeeId(undefined);
  };
  
  return (
    <div>
      <AccountList onAdd={handleAddAccount} onEdit={handleEditAccount} />
      
      {showForm && (
        <AccountForm employeeId={selectedEmployeeId} onClose={handleCloseForm} />
      )}
    </div>
  );
};

export default AccountManagement;