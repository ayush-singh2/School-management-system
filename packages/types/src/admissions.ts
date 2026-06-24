export type AdmissionStage =
  | "inquiry"
  | "application"
  | "doc_verification"
  | "fee_submission"
  | "confirmed"
  | "rejected";

export type LeadSource = "website" | "walk_in" | "phone" | "referral" | "social_media";

export interface AdmissionLead {
  id: string;
  schoolId: string;
  studentName: string;
  parentName: string;
  phone: string;
  email?: string;
  targetClass: string;
  stage: AdmissionStage;
  source: LeadSource;
  createdAt: string;
  notes?: string;
}
