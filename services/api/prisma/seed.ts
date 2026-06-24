import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding Modern School OS...");

  // ── School ──────────────────────────────────────────
  const school = await prisma.school.upsert({
    where: { email: "admin@jitendrapublicschool.edu" },
    update: {},
    create: {
      name: "Jitendra Public School",
      address: "Madhepura, Bihar - 852113",
      phone: "+91-9876543210",
      email: "admin@jitendrapublicschool.edu",
      website: "https://jitendrapublicschool.edu",
      plan: "AI",
    },
  });
  console.log(`✅ School: ${school.name} (${school.id})`);

  const hash = (p: string) => bcrypt.hash(p, 10);

  // ── Users ────────────────────────────────────────────
  const users = [
    { name: "Super Admin",       email: "admin@school.edu",      role: "admin" as const,      password: "Admin@123" },
    { name: "Dr. Suresh Pandey", email: "principal@school.edu",  role: "principal" as const,  password: "Principal@123" },
    { name: "Ms. Priya Verma",   email: "teacher@school.edu",    role: "teacher" as const,    password: "Teacher@123" },
    { name: "Mr. Rajesh Singh",  email: "parent@school.edu",     role: "parent" as const,     password: "Parent@123" },
    { name: "Ayush Singh",       email: "student@school.edu",    role: "student" as const,    password: "Student@123" },
    { name: "Mr. Ramesh Gupta",  email: "accounts@school.edu",   role: "accountant" as const, password: "Accounts@123" },
  ];

  const createdUsers: Record<string, any> = {};
  for (const u of users) {
    const user = await prisma.user.upsert({
      where: { schoolId_email: { schoolId: school.id, email: u.email } },
      update: {},
      create: {
        schoolId: school.id,
        name: u.name,
        email: u.email,
        passwordHash: await hash(u.password),
        role: u.role,
        phone: "+91-9876543210",
      },
    });
    createdUsers[u.role] = user;
    console.log(`  👤 ${u.role}: ${u.email} / ${u.password}`);
  }

  // ── Classes ──────────────────────────────────────────
  const classData = [
    { name: "Class 8", section: "A" },
    { name: "Class 8", section: "B" },
    { name: "Class 9", section: "A" },
    { name: "Class 10", section: "A" },
  ];
  const classes: Record<string, any> = {};
  for (const c of classData) {
    const cls = await prisma.class.upsert({
      where: { schoolId_name_section: { schoolId: school.id, name: c.name, section: c.section } },
      update: {},
      create: { schoolId: school.id, ...c },
    });
    classes[`${c.name}${c.section}`] = cls;
  }
  console.log(`✅ Classes created`);

  // ── Subjects ─────────────────────────────────────────
  const subjectData = [
    { name: "Mathematics", code: "MATH" },
    { name: "Science", code: "SCI" },
    { name: "English", code: "ENG" },
    { name: "Hindi", code: "HIN" },
    { name: "Social Studies", code: "SST" },
  ];
  const subjects: Record<string, any> = {};
  for (const s of subjectData) {
    const sub = await prisma.subject.upsert({
      where: { schoolId_code: { schoolId: school.id, code: s.code } },
      update: {},
      create: { schoolId: school.id, ...s },
    });
    subjects[s.code] = sub;
  }
  console.log(`✅ Subjects created`);

  // ── Teacher profile ──────────────────────────────────
  const teacher = await prisma.teacher.upsert({
    where: { userId: createdUsers["teacher"].id },
    update: {},
    create: {
      schoolId: school.id,
      userId: createdUsers["teacher"].id,
      employeeId: "EMP001",
      designation: "Senior Teacher",
      qualification: "M.Sc. English",
    },
  });

  // ── Parent profile ───────────────────────────────────
  const parent = await prisma.parent.upsert({
    where: { userId: createdUsers["parent"].id },
    update: {},
    create: {
      schoolId: school.id,
      userId: createdUsers["parent"].id,
      occupation: "Business",
    },
  });

  // ── Student profile ──────────────────────────────────
  await prisma.student.upsert({
    where: { userId: createdUsers["student"].id },
    update: {},
    create: {
      schoolId: school.id,
      userId: createdUsers["student"].id,
      rollNumber: "8A-001",
      classId: classes["Class 8A"].id,
      parentId: parent.id,
      dateOfBirth: new Date("2011-05-14"),
    },
  });
  console.log(`✅ Profiles created (teacher, parent, student)`);

  // ── Attendance (last 30 days) ────────────────────────
  const studentRecord = await prisma.student.findFirst({ where: { userId: createdUsers["student"].id } });
  if (studentRecord) {
    const statuses = ["present","present","present","present","absent","present","present","present","late","present"];
    for (let i = 0; i < 20; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      if (date.getDay() === 0 || date.getDay() === 6) continue;
      await prisma.attendance.upsert({
        where: { studentId_date: { studentId: studentRecord.id, date } },
        update: {},
        create: { studentId: studentRecord.id, date, status: (statuses[i % statuses.length] as any) },
      });
    }
    console.log(`✅ Attendance records seeded`);

    // ── Marks ──────────────────────────────────────────
    const markData = [
      { subjectId: subjects["MATH"].id, examType: "unit_test" as const, marks: 78, maxMarks: 100 },
      { subjectId: subjects["SCI"].id,  examType: "unit_test" as const, marks: 85, maxMarks: 100 },
      { subjectId: subjects["ENG"].id,  examType: "unit_test" as const, marks: 92, maxMarks: 100 },
      { subjectId: subjects["HIN"].id,  examType: "midterm" as const,   marks: 81, maxMarks: 100 },
      { subjectId: subjects["SST"].id,  examType: "midterm" as const,   marks: 74, maxMarks: 100 },
    ];
    for (const m of markData) {
      await prisma.mark.create({
        data: { studentId: studentRecord.id, teacherId: teacher.id, examDate: new Date(), ...m },
      }).catch(() => {});
    }
    console.log(`✅ Marks seeded`);
  }

  // ── Fee Records ──────────────────────────────────────
  if (studentRecord) {
    await prisma.feeRecord.create({
      data: {
        studentId: studentRecord.id,
        amount: 12500,
        feeType: "tuition",
        status: "due",
        dueDate: new Date("2026-07-15"),
      },
    }).catch(() => {});
    await prisma.feeRecord.create({
      data: {
        studentId: studentRecord.id,
        amount: 8500,
        feeType: "tuition",
        status: "paid",
        dueDate: new Date("2026-04-01"),
        paidDate: new Date("2026-03-28"),
        receiptNumber: "RCP-2026-001",
        paymentMode: "UPI",
      },
    }).catch(() => {});
    console.log(`✅ Fee records seeded`);
  }

  // ── Admission Leads ──────────────────────────────────
  const leads = [
    { studentName: "Ananya Sharma", parentName: "Rajiv Sharma", phone: "9876000001", targetClass: "Class 6", stage: "application" as const, source: "website" as const },
    { studentName: "Rohan Patel", parentName: "Sunita Patel", phone: "9876000002", targetClass: "Class 9", stage: "doc_verification" as const, source: "walk_in" as const },
    { studentName: "Simran Kaur", parentName: "Gurpreet Kaur", phone: "9876000003", targetClass: "Class 1", stage: "fee_submission" as const, source: "referral" as const },
    { studentName: "Arjun Mehta", parentName: "Amit Mehta", phone: "9876000004", targetClass: "Class 7", stage: "confirmed" as const, source: "website" as const },
    { studentName: "Nisha Yadav", parentName: "Ram Yadav", phone: "9876000005", targetClass: "Class 3", stage: "inquiry" as const, source: "phone" as const },
  ];
  for (const l of leads) {
    await prisma.admissionLead.create({ data: { schoolId: school.id, ...l } }).catch(() => {});
  }
  console.log(`✅ Admission leads seeded`);

  console.log("\n🎉 Seed complete!\n");
  console.log("┌─────────────────────────────────────────────────────┐");
  console.log("│           TEST CREDENTIALS                          │");
  console.log("├──────────────┬──────────────────────┬───────────────┤");
  console.log("│ Role         │ Email                │ Password      │");
  console.log("├──────────────┼──────────────────────┼───────────────┤");
  console.log("│ Admin        │ admin@school.edu     │ Admin@123     │");
  console.log("│ Principal    │ principal@school.edu │ Principal@123 │");
  console.log("│ Teacher      │ teacher@school.edu   │ Teacher@123   │");
  console.log("│ Parent       │ parent@school.edu    │ Parent@123    │");
  console.log("│ Student      │ student@school.edu   │ Student@123   │");
  console.log("│ Accountant   │ accounts@school.edu  │ Accounts@123  │");
  console.log("└──────────────┴──────────────────────┴───────────────┘");
}

main().catch(console.error).finally(() => prisma.$disconnect());
