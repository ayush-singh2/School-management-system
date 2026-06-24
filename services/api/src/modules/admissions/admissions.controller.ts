import { Controller, UseGuards } from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { AdmissionsService } from "./admissions.service";

@ApiTags("admissions")
@ApiBearerAuth()
@UseGuards(AuthGuard("jwt"))
@Controller("admissions")
export class AdmissionsController {
  constructor(private readonly admissionsService: AdmissionsService) {}
}
