import { Employee, Department, PfDetail, AccountDetail } from '../types';

export const employees: Employee[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '555-123-4567',
    dateOfJoining: '2022-03-15',
    department: 'Engineering',
    designation: 'Software Engineer',
    salary: 85000,
    status: 'active',
    pfEnrolled: true,
    pfNumber: 'PF123456',
    bankName: 'National Bank',
    accountNumber: '1234567890',
    ifscCode: 'NATL0001234',
  },
  {
    id: '2',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    phone: '555-987-6543',
    dateOfJoining: '2021-08-10',
    department: 'Marketing',
    designation: 'Marketing Manager',
    salary: 92000,
    status: 'active',
    pfEnrolled: true,
    pfNumber: 'PF789012',
    bankName: 'City Bank',
    accountNumber: '0987654321',
    ifscCode: 'CITY0005678',
  },
  {
    id: '3',
    firstName: 'Michael',
    lastName: 'Johnson',
    email: 'michael.johnson@example.com',
    phone: '555-456-7890',
    dateOfJoining: '2023-01-20',
    department: 'Human Resources',
    designation: 'HR Specialist',
    salary: 78000,
    status: 'active',
    pfEnrolled: false,
  },
  {
    id: '4',
    firstName: 'Emily',
    lastName: 'Davis',
    email: 'emily.davis@example.com',
    phone: '555-789-0123',
    dateOfJoining: '2022-06-05',
    department: 'Finance',
    designation: 'Financial Analyst',
    salary: 88000,
    status: 'active',
    pfEnrolled: true,
    pfNumber: 'PF345678',
    bankName: 'Global Bank',
    accountNumber: '5678901234',
    ifscCode: 'GLOB0009012',
  },
  {
    id: '5',
    firstName: 'Robert',
    lastName: 'Wilson',
    email: 'robert.wilson@example.com',
    phone: '555-234-5678',
    dateOfJoining: '2021-11-15',
    department: 'Operations',
    designation: 'Operations Manager',
    salary: 95000,
    status: 'inactive',
    pfEnrolled: true,
    pfNumber: 'PF901234',
    bankName: 'Union Bank',
    accountNumber: '3456789012',
    ifscCode: 'UNIN0003456',
  }
];

export const departments: Department[] = [
  { id: '1', name: 'Engineering', head: 'Alex Turner' },
  { id: '2', name: 'Marketing', head: 'Sarah Parker' },
  { id: '3', name: 'Human Resources', head: 'David Miller' },
  { id: '4', name: 'Finance', head: 'Jessica Brown' },
  { id: '5', name: 'Operations', head: 'Kevin Clark' }
];

export const pfDetails: PfDetail[] = [
  {
    employeeId: '1',
    pfNumber: 'PF123456',
    enrollmentDate: '2022-04-01',
    employeeContribution: 3400,
    employerContribution: 3400
  },
  {
    employeeId: '2',
    pfNumber: 'PF789012',
    enrollmentDate: '2021-09-01',
    employeeContribution: 3680,
    employerContribution: 3680
  },
  {
    employeeId: '4',
    pfNumber: 'PF345678',
    enrollmentDate: '2022-07-01',
    employeeContribution: 3520,
    employerContribution: 3520
  },
  {
    employeeId: '5',
    pfNumber: 'PF901234',
    enrollmentDate: '2021-12-01',
    employeeContribution: 3800,
    employerContribution: 3800
  }
];

export const accountDetails: AccountDetail[] = [
  {
    employeeId: '1',
    bankName: 'National Bank',
    accountNumber: '1234567890',
    ifscCode: 'NATL0001234',
    accountType: 'salary'
  },
  {
    employeeId: '2',
    bankName: 'City Bank',
    accountNumber: '0987654321',
    ifscCode: 'CITY0005678',
    accountType: 'salary'
  },
  {
    employeeId: '4',
    bankName: 'Global Bank',
    accountNumber: '5678901234',
    ifscCode: 'GLOB0009012',
    accountType: 'salary'
  },
  {
    employeeId: '5',
    bankName: 'Union Bank',
    accountNumber: '3456789012',
    ifscCode: 'UNIN0003456',
    accountType: 'salary'
  }
];