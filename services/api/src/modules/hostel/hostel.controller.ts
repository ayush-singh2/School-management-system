import { Controller, UseGuards } from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { HostelService } from "./hostel.service";

@ApiTags("hostel")
@ApiBearerAuth()
@UseGuards(AuthGuard("jwt"))
@Controller("hostel")
export class HostelController {
  constructor(private readonly hostelService: HostelService) {}
}
