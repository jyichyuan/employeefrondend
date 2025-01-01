export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  position: string;
  department: string;
  joinDate: string;
  phoneNumber: string;
  imageUrl?: string;
  skills: string[];
}

export interface EmployeeFormData extends Omit<Employee, 'id'> {}