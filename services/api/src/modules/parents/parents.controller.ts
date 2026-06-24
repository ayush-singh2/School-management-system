import { Controller, UseGuards } from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { ParentsService } from "./parents.service";

@ApiTags("parents")
@ApiBearerAuth()
@UseGuards(AuthGuard("jwt"))
@Controller("parents")
export class ParentsController {
  constructor(private readonly parentsService: ParentsService) {}
}
