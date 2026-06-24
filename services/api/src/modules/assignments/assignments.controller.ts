import { Controller, UseGuards } from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { AssignmentsService } from "./assignments.service";

@ApiTags("assignments")
@ApiBearerAuth()
@UseGuards(AuthGuard("jwt"))
@Controller("assignments")
export class AssignmentsController {
  constructor(private readonly assignmentsService: AssignmentsService) {}
}
