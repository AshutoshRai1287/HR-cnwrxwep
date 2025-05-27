import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Employee, Department, PfDetail, AccountDetail } from '../types';
import { employees as initialEmployees, departments as initialDepartments, pfDetails as initialPfDetails, accountDetails as initialAccountDetails } from '../data/mockData';

interface AppContextType {
  employees: Employee[];
  departments: Department[];
  pfDetails: PfDetail[];
  accountDetails: AccountDetail[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  addEmployee: (employee: Omit<Employee, 'id'>) => void;
  updateEmployee: (employee: Employee) => void;
  deleteEmployee: (id: string) => void;
  addPfDetail: (pfDetail: PfDetail) => void;
  updatePfDetail: (pfDetail: PfDetail) => void;
  addAccountDetail: (accountDetail: AccountDetail) => void;
  updateAccountDetail: (accountDetail: AccountDetail) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [departments, setDepartments] = useState<Department[]>(initialDepartments);
  const [pfDetails, setPfDetails] = useState<PfDetail[]>(initialPfDetails);
  const [accountDetails, setAccountDetails] = useState<AccountDetail[]>(initialAccountDetails);
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  const addEmployee = (employee: Omit<Employee, 'id'>) => {
    const newEmployee = {
      ...employee,
      id: Date.now().toString(),
    };
    setEmployees([...employees, newEmployee as Employee]);
  };

  const updateEmployee = (updatedEmployee: Employee) => {
    setEmployees(
      employees.map((employee) =>
        employee.id === updatedEmployee.id ? updatedEmployee : employee
      )
    );
  };

  const deleteEmployee = (id: string) => {
    setEmployees(employees.filter((employee) => employee.id !== id));
    setPfDetails(pfDetails.filter((detail) => detail.employeeId !== id));
    setAccountDetails(accountDetails.filter((detail) => detail.employeeId !== id));
  };

  const addPfDetail = (pfDetail: PfDetail) => {
    setPfDetails([...pfDetails, pfDetail]);
    
    const employeeToUpdate = employees.find(e => e.id === pfDetail.employeeId);
    if (employeeToUpdate) {
      updateEmployee({
        ...employeeToUpdate,
        pfEnrolled: true,
        pfNumber: pfDetail.pfNumber
      });
    }
  };

  const updatePfDetail = (updatedPfDetail: PfDetail) => {
    setPfDetails(
      pfDetails.map((detail) =>
        detail.employeeId === updatedPfDetail.employeeId ? updatedPfDetail : detail
      )
    );
    
    const employeeToUpdate = employees.find(e => e.id === updatedPfDetail.employeeId);
    if (employeeToUpdate) {
      updateEmployee({
        ...employeeToUpdate,
        pfNumber: updatedPfDetail.pfNumber
      });
    }
  };

  const addAccountDetail = (accountDetail: AccountDetail) => {
    setAccountDetails([...accountDetails, accountDetail]);
    
    const employeeToUpdate = employees.find(e => e.id === accountDetail.employeeId);
    if (employeeToUpdate) {
      updateEmployee({
        ...employeeToUpdate,
        bankName: accountDetail.bankName,
        accountNumber: accountDetail.accountNumber,
        ifscCode: accountDetail.ifscCode
      });
    }
  };

  const updateAccountDetail = (updatedAccountDetail: AccountDetail) => {
    setAccountDetails(
      accountDetails.map((detail) =>
        detail.employeeId === updatedAccountDetail.employeeId ? updatedAccountDetail : detail
      )
    );
    
    const employeeToUpdate = employees.find(e => e.id === updatedAccountDetail.employeeId);
    if (employeeToUpdate) {
      updateEmployee({
        ...employeeToUpdate,
        bankName: updatedAccountDetail.bankName,
        accountNumber: updatedAccountDetail.accountNumber,
        ifscCode: updatedAccountDetail.ifscCode
      });
    }
  };

  return (
    <AppContext.Provider
      value={{
        employees,
        departments,
        pfDetails,
        accountDetails,
        activeTab,
        setActiveTab,
        addEmployee,
        updateEmployee,
        deleteEmployee,
        addPfDetail,
        updatePfDetail,
        addAccountDetail,
        updateAccountDetail,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};