import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { Search, Plus, Edit } from 'lucide-react';

const AccountList: React.FC<{
  onAdd: () => void;
  onEdit: (id: string) => void;
}> = ({ onAdd, onEdit }) => {
  const { employees, accountDetails } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter employees with account details that match search term
  const filteredEmployees = employees
    .filter(employee => employee.accountNumber)
    .filter(employee => {
      const fullName = `${employee.firstName} ${employee.lastName}`.toLowerCase();
      return searchTerm === '' || 
        fullName.includes(searchTerm.toLowerCase()) ||
        employee.accountNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.bankName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        false;
    });
  
  // Get account details for each employee
  const employeesWithAccountDetails = filteredEmployees.map(employee => {
    const accountDetail = accountDetails.find(detail => detail.employeeId === employee.id);
    return {
      ...employee,
      accountDetail
    };
  });
  
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-xl font-semibold text-gray-800">Account Management</h2>
          <button
            onClick={onAdd}
            className="flex items-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Plus size={18} className="mr-1" />
            Add Bank Account
          </button>
        </div>
        
        <div className="mt-4 relative">
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, account number or bank..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition-all"
          />
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bank Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account Number</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IFSC Code</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account Type</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {employeesWithAccountDetails.map((employee) => (
              <tr key={employee.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 font-medium">
                      {employee.firstName.charAt(0)}{employee.lastName.charAt(0)}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{employee.firstName} {employee.lastName}</div>
                      <div className="text-sm text-gray-500">{employee.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{employee.bankName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {employee.accountNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {employee.ifscCode}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {employee.accountDetail?.accountType || 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => onEdit(employee.id)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    <Edit size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {employeesWithAccountDetails.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No bank accounts found. Try adjusting your search or add a new bank account.
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountList;