export type Role = "student" | "parent" | "teacher" | "accountant" | "principal" | "admin";
export type Plan = "BASIC" | "PROFESSIONAL" | "AI";

export interface AuthUser {
  userId: string;
  email: string;
  name: string;
  role: Role;
  schoolId: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}

export * from "./student";
export * from "./teacher";
export * from "./fees";
export * from "./attendance";
export * from "./admissions";
