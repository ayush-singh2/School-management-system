import { Controller, UseGuards } from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { AttendanceService } from "./attendance.service";

@ApiTags("attendance")
@ApiBearerAuth()
@UseGuards(AuthGuard("jwt"))
@Controller("attendance")
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}
}
