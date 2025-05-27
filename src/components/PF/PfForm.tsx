import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import { X } from 'lucide-react';

interface PfFormProps {
  employeeId?: string;
  onClose: () => void;
}

const PfForm: React.FC<PfFormProps> = ({ employeeId, onClose }) => {
  const { employees, pfDetails, addPfDetail, updatePfDetail } = useAppContext();
  
  const [formData, setFormData] = useState({
    employeeId: '',
    pfNumber: '',
    enrollmentDate: new Date().toISOString().split('T')[0],
    employeeContribution: '',
    employerContribution: ''
  });
  
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  
  useEffect(() => {
    if (employeeId) {
      const pfDetail = pfDetails.find(detail => detail.employeeId === employeeId);
      if (pfDetail) {
        setFormData({
          employeeId: pfDetail.employeeId,
          pfNumber: pfDetail.pfNumber,
          enrollmentDate: pfDetail.enrollmentDate,
          employeeContribution: pfDetail.employeeContribution.toString(),
          employerContribution: pfDetail.employerContribution.toString()
        });
      } else {
        const employee = employees.find(emp => emp.id === employeeId);
        if (employee) {
          setFormData({
            ...formData,
            employeeId: employee.id,
            pfNumber: employee.pfNumber || ''
          });
        }
      }
    }
  }, [employeeId, employees, pfDetails]);
  
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
    if (!formData.pfNumber.trim()) errors.pfNumber = 'PF number is required';
    if (!formData.enrollmentDate.trim()) errors.enrollmentDate = 'Enrollment date is required';
    
    if (!formData.employeeContribution.trim()) {
      errors.employeeContribution = 'Employee contribution is required';
    } else if (isNaN(Number(formData.employeeContribution)) || Number(formData.employeeContribution) < 0) {
      errors.employeeContribution = 'Employee contribution must be a valid number';
    }
    
    if (!formData.employerContribution.trim()) {
      errors.employerContribution = 'Employer contribution is required';
    } else if (isNaN(Number(formData.employerContribution)) || Number(formData.employerContribution) < 0) {
      errors.employerContribution = 'Employer contribution must be a valid number';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    const pfData = {
      ...formData,
      employeeContribution: Number(formData.employeeContribution),
      employerContribution: Number(formData.employerContribution)
    };
    
    if (pfDetails.find(detail => detail.employeeId === formData.employeeId)) {
      updatePfDetail(pfData);
    } else {
      addPfDetail(pfData);
    }
    
    onClose();
  };
  
  // Filter out employees who already have PF details unless it's the current one being edited
  const availableEmployees = employees.filter(employee => {
    if (employee.id === employeeId) return true;
    return !pfDetails.some(detail => detail.employeeId === employee.id);
  });
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
          <h2 className="text-xl font-semibold text-gray-800">
            {employeeId && pfDetails.find(detail => detail.employeeId === employeeId) 
              ? 'Edit PF Record' 
              : 'Add New PF Record'}
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
              <label className="block text-sm font-medium text-gray-700 mb-1">PF Number*</label>
              <input
                type="text"
                name="pfNumber"
                value={formData.pfNumber}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition-all ${
                  formErrors.pfNumber ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {formErrors.pfNumber && (
                <p className="mt-1 text-sm text-red-600">{formErrors.pfNumber}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Enrollment Date*</label>
              <input
                type="date"
                name="enrollmentDate"
                value={formData.enrollmentDate}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition-all ${
                  formErrors.enrollmentDate ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {formErrors.enrollmentDate && (
                <p className="mt-1 text-sm text-red-600">{formErrors.enrollmentDate}</p>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Employee Contribution ($)*</label>
                <input
                  type="text"
                  name="employeeContribution"
                  value={formData.employeeContribution}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition-all ${
                    formErrors.employeeContribution ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {formErrors.employeeContribution && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.employeeContribution}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Employer Contribution ($)*</label>
                <input
                  type="text"
                  name="employerContribution"
                  value={formData.employerContribution}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition-all ${
                    formErrors.employerContribution ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {formErrors.employerContribution && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.employerContribution}</p>
                )}
              </div>
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
              {employeeId && pfDetails.find(detail => detail.employeeId === employeeId) 
                ? 'Update PF Record' 
                : 'Add PF Record'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PfForm;