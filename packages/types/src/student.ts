export interface Student {
  id: string;
  schoolId: string;
  name: string;
  rollNumber: string;
  className: string;
  section: string;
  parentId: string;
  dateOfBirth: string;
  admissionDate: string;
  bloodGroup?: string;
  address?: string;
}

export interface AttendanceSummary {
  studentId: string;
  month: number;
  year: number;
  present: number;
  absent: number;
  late: number;
  percentage: number;
}

export interface MarkSummary {
  studentId: string;
  subject: string;
  examType: string;
  marks: number;
  maxMarks: number;
  percentage: number;
  examDate: string;
}
