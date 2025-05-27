import React, { ReactNode } from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color: 'blue' | 'green' | 'purple' | 'orange';
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, trend, color }) => {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-500 border-blue-200',
    green: 'bg-green-50 text-green-500 border-green-200',
    purple: 'bg-purple-50 text-purple-500 border-purple-200',
    orange: 'bg-orange-50 text-orange-500 border-orange-200',
  };

  const iconColorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
    orange: 'bg-orange-500',
  };

  return (
    <div className={`rounded-xl p-6 border ${colorClasses[color]} transition-all duration-300 hover:shadow-md`}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
          <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
          {trend && (
            <p className={`text-xs font-medium mt-2 ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%{' '}
              <span className="text-gray-500">from last month</span>
            </p>
          )}
        </div>
        <div className={`w-10 h-10 rounded-full ${iconColorClasses[color]} flex items-center justify-center text-white`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;