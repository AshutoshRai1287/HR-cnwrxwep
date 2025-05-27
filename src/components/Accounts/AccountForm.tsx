import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import { X } from 'lucide-react';

interface AccountFormProps {
  employeeId?: string;
  onClose: () => void;
}

const AccountForm: React.FC<AccountFormProps> = ({ employeeId, onClose }) => {
  const { employees, accountDetails, addAccountDetail, updateAccountDetail } = useAppContext();
  
  const [formData, setFormData] = useState({
    employeeId: '',
    bankName: '',
    accountNumber: '',
    ifscCode: '',
    accountType: 'salary'
  });
  
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  
  useEffect(() => {
    if (employeeId) {
      const accountDetail = accountDetails.find(detail => detail.employeeId === employeeId);
      if (accountDetail) {
        setFormData({
          employeeId: accountDetail.employeeId,
          bankName: accountDetail.bankName,
          accountNumber: accountDetail.accountNumber,
          ifscCode: accountDetail.ifscCode,
          accountType: accountDetail.accountType
        });
      } else {
        const employee = employees.find(emp => emp.id === employeeId);
        if (employee) {
          setFormData({
            ...formData,
            employeeId: employee.id,
            bankName: employee.bankName || '',
            accountNumber: employee.accountNumber || '',
            ifscCode: employee.ifscCode || ''
          });
        }
      }
    }
  }, [employeeId, employees, accountDetails]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error for this field when it's changed
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };
  
  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.employeeId) errors.employeeId = 'Employee is required';
    if (!formData.bankName.trim()) errors.bankName = 'Bank name is required';
    if (!formData.accountNumber.trim()) errors.accountNumber = 'Account number is required';
    if (!formData.ifscCode.trim()) errors.ifscCode = 'IFSC code is required';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    if (accountDetails.find(detail => detail.employeeId === formData.employeeId)) {
      updateAccountDetail(formData);
    } else {
      addAccountDetail(formData);
    }
    
    onClose();
  };
  
  // Filter out employees who already have account details unless it's the current one being edited
  const availableEmployees = employees.filter(employee => {
    if (employee.id === employeeId) return true;
    return !accountDetails.some(detail => detail.employeeId === employee.id);
  });
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
          <h2 className="text-xl font-semibold text-gray-800">
            {employeeId && accountDetails.find(detail => detail.employeeId === employeeId) 
              ? 'Edit Bank Account' 
              : 'Add New Bank Account'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Employee*</label>
              <select
                name="employeeId"
                value={formData.employeeId}
                onChange={handleChange}
                disabled={!!employeeId}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition-all ${
                  formErrors.employeeId ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select Employee</option>
                {availableEmployees.map(employee => (
                  <option key={employee.id} value={employee.id}>
                    {employee.firstName} {employee.lastName}
                  </option>
                ))}
              </select>
              {formErrors.employeeId && (
                <p className="mt-1 text-sm text-red-600">{formErrors.employeeId}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bank Name*</label>
              <input
                type="text"
                name="bankName"
                value={formData.bankName}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition-all ${
                  formErrors.bankName ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {formErrors.bankName && (
                <p className="mt-1 text-sm text-red-600">{formErrors.bankName}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Account Number*</label>
              <input
                type="text"
                name="accountNumber"
                value={formData.accountNumber}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition-all ${
                  formErrors.accountNumber ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {formErrors.accountNumber && (
                <p className="mt-1 text-sm text-red-600">{formErrors.accountNumber}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">IFSC Code*</label>
              <input
                type="text"
                name="ifscCode"
                value={formData.ifscCode}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition-all ${
                  formErrors.ifscCode ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {formErrors.ifscCode && (
                <p className="mt-1 text-sm text-red-600">{formErrors.ifscCode}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Account Type*</label>
              <select
                name="accountType"
                value={formData.accountType}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition-all"
              >
                <option value="salary">Salary Account</option>
                <option value="savings">Savings Account</option>
                <option value="current">Current Account</option>
              </select>
            </div>
          </div>
          
          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              {employeeId && accountDetails.find(detail => detail.employeeId === employeeId) 
                ? 'Update Bank Account' 
                : 'Add Bank Account'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountForm;