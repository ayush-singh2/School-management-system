export type Role = "student" | "parent" | "teacher" | "accountant" | "principal" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  schoolId: string;
  avatarUrl?: string;
}

export interface Student {
  id: string;
  schoolId: string;
  name: string;
  rollNumber: string;
  classId: string;
  section: string;
  parentId: string;
  admissionDate: string;
  dateOfBirth: string;
}

export interface AttendanceRecord {
  date: string;
  studentId: string;
  status: "present" | "absent" | "late" | "holiday";
}

export interface MarkEntry {
  studentId: string;
  subjectId: string;
  examType: "unit_test" | "midterm" | "final" | "assignment" | "practical";
  marks: number;
  maxMarks: number;
  date: string;
}

export interface FeeRecord {
  id: string;
  studentId: string;
  amount: number;
  type: "tuition" | "transport" | "hostel" | "exam" | "other";
  status: "paid" | "due" | "partial" | "overdue";
  dueDate: string;
  paidDate?: string;
  receiptNumber?: string;
}

export interface Assignment {
  id: string;
  classId: string;
  subjectId: string;
  teacherId: string;
  title: string;
  description: string;
  dueDate: string;
  attachmentUrl?: string;
}

export interface AdmissionLead {
  id: string;
  schoolId: string;
  name: string;
  parentName: string;
  phone: string;
  email?: string;
  targetClass: string;
  stage: "inquiry" | "application" | "doc_verification" | "fee_submission" | "confirmed" | "rejected";
  source: "website" | "walk_in" | "phone" | "referral";
  createdAt: string;
  notes?: string;
}

export interface AIInsightResponse {
  insight: string;
  generatedAt: string;
  model: string;
}
