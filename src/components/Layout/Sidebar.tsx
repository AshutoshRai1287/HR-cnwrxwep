import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Wallet, 
  Landmark, 
  FileText, 
  Calendar, 
  BarChart, 
  Settings, 
  HelpCircle, 
  LogOut 
} from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab } = useAppContext();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'employees', label: 'Employees', icon: <Users size={20} /> },
    { id: 'pf', label: 'PF Management', icon: <Wallet size={20} /> },
    { id: 'accounts', label: 'Accounts', icon: <Landmark size={20} /> },
    { id: 'documents', label: 'Documents', icon: <FileText size={20} /> },
    { id: 'attendance', label: 'Attendance', icon: <Calendar size={20} /> },
    { id: 'reports', label: 'Reports', icon: <BarChart size={20} /> },
  ];

  const bottomMenuItems = [
    { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
    { id: 'help', label: 'Help & Support', icon: <HelpCircle size={20} /> },
    { id: 'logout', label: 'Logout', icon: <LogOut size={20} /> },
  ];

  return (
    <aside className="bg-gray-800 text-white w-64 min-h-screen flex flex-col">
      <div className="p-5 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
            <Users size={20} className="text-white" />
          </div>
          <span className="text-xl font-bold">HR System</span>
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="px-3 space-y-1">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === item.id
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-700">
        <ul className="space-y-1">
          {bottomMenuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActiveTab(item.id)}
                className="w-full flex items-center space-x-3 px-4 py-2 rounded-lg text-gray-300 hover:bg-gray-700 transition-colors"
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;