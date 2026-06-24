import { Controller, UseGuards } from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { ReportsService } from "./reports.service";

@ApiTags("reports")
@ApiBearerAuth()
@UseGuards(AuthGuard("jwt"))
@Controller("reports")
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}
}
