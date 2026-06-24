import { Controller, UseGuards } from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { StudentsService } from "./students.service";

@ApiTags("students")
@ApiBearerAuth()
@UseGuards(AuthGuard("jwt"))
@Controller("students")
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}
}
