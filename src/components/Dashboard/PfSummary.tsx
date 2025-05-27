import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { Wallet } from 'lucide-react';

const PfSummary: React.FC = () => {
  const { employees, pfDetails } = useAppContext();
  
  const totalEmployees = employees.length;
  const enrolledEmployees = employees.filter(emp => emp.pfEnrolled).length;
  const enrollmentPercentage = Math.round((enrolledEmployees / totalEmployees) * 100);
  
  const totalContributions = pfDetails.reduce((sum, detail) => 
    sum + detail.employeeContribution + detail.employerContribution, 0);
  
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
          <Wallet size={20} className="text-blue-500" />
        </div>
        <h3 className="text-lg font-semibold text-gray-800">PF Summary</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-500">Enrolled Employees</p>
          <p className="text-xl font-semibold text-gray-800">{enrolledEmployees} / {totalEmployees}</p>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
            <div 
              className="bg-blue-500 h-2.5 rounded-full" 
              style={{ width: `${enrollmentPercentage}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 mt-1">{enrollmentPercentage}% enrolled</p>
        </div>
        
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-500">Total Monthly Contributions</p>
          <p className="text-xl font-semibold text-gray-800">${totalContributions.toLocaleString()}</p>
          <div className="flex items-center justify-between mt-2">
            <p className="text-xs text-gray-500">Employee: ${totalContributions/2}</p>
            <p className="text-xs text-gray-500">Employer: ${totalContributions/2}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PfSummary;