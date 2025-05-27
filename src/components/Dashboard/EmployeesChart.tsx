import React from 'react';
import { useAppContext } from '../../context/AppContext';

const EmployeesChart: React.FC = () => {
  const { employees, departments } = useAppContext();
  
  // Calculate employees per department for the chart
  const departmentCounts = departments.map(dept => {
    const count = employees.filter(emp => emp.department === dept.name).length;
    return {
      name: dept.name,
      count,
      percentage: Math.round((count / employees.length) * 100)
    };
  }).sort((a, b) => b.count - a.count);

  // Generate colors for each department
  const colors = [
    'bg-blue-500', 'bg-green-500', 'bg-purple-500', 
    'bg-orange-500', 'bg-teal-500', 'bg-pink-500',
    'bg-indigo-500', 'bg-yellow-500', 'bg-red-500'
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Employees by Department</h3>
      
      <div className="space-y-4">
        {departmentCounts.map((dept, index) => (
          <div key={dept.name} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-600">{dept.name}</span>
              <span className="text-sm text-gray-700">{dept.count} ({dept.percentage}%)</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className={`${colors[index % colors.length]} h-2.5 rounded-full`} 
                style={{ width: `${dept.percentage}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeesChart;