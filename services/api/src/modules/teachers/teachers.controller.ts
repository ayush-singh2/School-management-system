import { Controller, UseGuards } from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { TeachersService } from "./teachers.service";

@ApiTags("teachers")
@ApiBearerAuth()
@UseGuards(AuthGuard("jwt"))
@Controller("teachers")
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}
}
