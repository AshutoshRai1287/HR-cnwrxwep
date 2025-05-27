export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfJoining: string;
  department: string;
  designation: string;
  salary: number;
  status: 'active' | 'inactive';
  pfEnrolled: boolean;
  pfNumber?: string;
  bankName?: string;
  accountNumber?: string;
  ifscCode?: string;
}

export interface Department {
  id: string;
  name: string;
  head: string;
}

export interface PfDetail {
  employeeId: string;
  pfNumber: string;
  enrollmentDate: string;
  employeeContribution: number;
  employerContribution: number;
}

export interface AccountDetail {
  employeeId: string;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  accountType: 'savings' | 'current' | 'salary';
}