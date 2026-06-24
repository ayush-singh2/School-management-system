export interface Teacher {
  id: string;
  schoolId: string;
  name: string;
  email: string;
  employeeId: string;
  designation: string;
  joiningDate: string;
  qualification?: string;
  subjects?: string[];
  classes?: string[];
}
