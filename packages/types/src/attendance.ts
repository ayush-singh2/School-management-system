export type AttendanceStatus = "present" | "absent" | "late" | "holiday";

export interface AttendanceRecord {
  studentId: string;
  date: string;
  status: AttendanceStatus;
}

export interface BulkAttendancePayload {
  classId: string;
  date: string;
  records: { studentId: string; status: AttendanceStatus }[];
}
