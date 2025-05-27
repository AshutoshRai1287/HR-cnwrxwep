import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { ChevronRight, User } from 'lucide-react';

const RecentEmployees: React.FC = () => {
  const { employees, setActiveTab } = useAppContext();

  // Sort employees by joining date (newest first) and take the first 5
  const recentEmployees = [...employees]
    .sort((a, b) => new Date(b.dateOfJoining).getTime() - new Date(a.dateOfJoining).getTime())
    .slice(0, 5);

  const handleViewAll = () => {
    setActiveTab('employees');
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Recent Employees</h3>
        <button 
          onClick={handleViewAll}
          className="text-blue-500 text-sm flex items-center hover:text-blue-700 transition-colors"
        >
          View all <ChevronRight size={16} />
        </button>
      </div>
      
      <div className="space-y-4">
        {recentEmployees.map((employee) => (
          <div key={employee.id} className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
              <User size={18} className="text-gray-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-800">{employee.firstName} {employee.lastName}</p>
              <p className="text-sm text-gray-500">{employee.designation}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">{employee.department}</p>
              <p className="text-xs text-gray-500">{new Date(employee.dateOfJoining).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentEmployees;