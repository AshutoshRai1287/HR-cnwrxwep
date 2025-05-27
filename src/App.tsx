import React from 'react';
import { AppProvider, useAppContext } from './context/AppContext';
import MainLayout from './components/Layout/MainLayout';
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';
import PfManagement from './pages/PfManagement';
import AccountManagement from './pages/AccountManagement';

const AppContent: React.FC = () => {
  const { activeTab } = useAppContext();
  
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'employees':
        return <Employees />;
      case 'pf':
        return <PfManagement />;
      case 'accounts':
        return <AccountManagement />;
      default:
        return <Dashboard />;
    }
  };
  
  return (
    <MainLayout>
      {renderContent()}
    </MainLayout>
  );
};

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;