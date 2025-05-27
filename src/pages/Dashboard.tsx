import React from 'react';
import { useAppContext } from '../context/AppContext';
import StatCard from '../components/Dashboard/StatCard';
import EmployeesChart from '../components/Dashboard/EmployeesChart';
import RecentEmployees from '../components/Dashboard/RecentEmployees';
import PfSummary from '../components/Dashboard/PfSummary';
import { Users, DollarSign, Wallet, UserCheck, Clock } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { employees, departments, pfDetails } = useAppContext();
  
  const totalEmployees = employees.length;
  const activeEmployees = employees.filter(emp => emp.status === 'active').length;
  const totalSalary = employees.reduce((sum, emp) => sum + emp.salary, 0);
  const pfEnrolled = employees.filter(emp => emp.pfEnrolled).length;
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total Employees" 
          value={totalEmployees} 
          icon={<Users size={20} />}
          color="blue"
        />
        <StatCard 
          title="Active Employees" 
          value={activeEmployees} 
          icon={<UserCheck size={20} />}
          trend={{ value: 5, isPositive: true }}
          color="green"
        />
        <StatCard 
          title="Total Salary" 
          value={`$${totalSalary.toLocaleString()}`} 
          icon={<DollarSign size={20} />}
          color="purple"
        />
        <StatCard 
          title="PF Enrolled" 
          value={`${pfEnrolled} / ${totalEmployees}`} 
          icon={<Wallet size={20} />}
          color="orange"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <EmployeesChart />
        
        <div className="space-y-6">
          <PfSummary />
          
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center mr-3">
                <Clock size={20} className="text-orange-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Upcoming Events</h3>
            </div>
            
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg">
                <p className="text-sm font-medium text-blue-800">Salary Processing</p>
                <p className="text-xs text-blue-600">25th of this month</p>
              </div>
              <div className="p-3 bg-green-50 border border-green-100 rounded-lg">
                <p className="text-sm font-medium text-green-800">PF Submission</p>
                <p className="text-xs text-green-600">15th of next month</p>
              </div>
              <div className="p-3 bg-purple-50 border border-purple-100 rounded-lg">
                <p className="text-sm font-medium text-purple-800">Tax Filing Deadline</p>
                <p className="text-xs text-purple-600">31st of next month</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <RecentEmployees />
      </div>
    </div>
  );
};

export default Dashboard;