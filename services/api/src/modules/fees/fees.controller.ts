import { Controller, UseGuards } from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { FeesService } from "./fees.service";

@ApiTags("fees")
@ApiBearerAuth()
@UseGuards(AuthGuard("jwt"))
@Controller("fees")
export class FeesController {
  constructor(private readonly feesService: FeesService) {}
}
