export type FeeType = "tuition" | "transport" | "hostel" | "exam" | "library" | "sports" | "other";
export type FeeStatus = "due" | "paid" | "partial" | "overdue" | "waived";

export interface FeeRecord {
  id: string;
  studentId: string;
  studentName: string;
  amount: number;
  feeType: FeeType;
  status: FeeStatus;
  dueDate: string;
  paidDate?: string;
  receiptNumber?: string;
  paymentMode?: string;
  lateFee: number;
  discount: number;
}
