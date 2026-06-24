import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ThrottlerModule } from "@nestjs/throttler";
import { PrismaModule } from "./prisma/prisma.module";
import { AuthModule } from "./modules/auth/auth.module";
import { StudentsModule } from "./modules/students/students.module";
import { TeachersModule } from "./modules/teachers/teachers.module";
import { ParentsModule } from "./modules/parents/parents.module";
import { AttendanceModule } from "./modules/attendance/attendance.module";
import { MarksModule } from "./modules/marks/marks.module";
import { AssignmentsModule } from "./modules/assignments/assignments.module";
import { FeesModule } from "./modules/fees/fees.module";
import { AdmissionsModule } from "./modules/admissions/admissions.module";
import { TransportModule } from "./modules/transport/transport.module";
import { LibraryModule } from "./modules/library/library.module";
import { HostelModule } from "./modules/hostel/hostel.module";
import { NotificationsModule } from "./modules/notifications/notifications.module";
import { ReportsModule } from "./modules/reports/reports.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot([{ ttl: 60_000, limit: 100 }]),
    PrismaModule,
    AuthModule,
    StudentsModule,
    TeachersModule,
    ParentsModule,
    AttendanceModule,
    MarksModule,
    AssignmentsModule,
    FeesModule,
    AdmissionsModule,
    TransportModule,
    LibraryModule,
    HostelModule,
    NotificationsModule,
    ReportsModule,
  ],
})
export class AppModule {}
