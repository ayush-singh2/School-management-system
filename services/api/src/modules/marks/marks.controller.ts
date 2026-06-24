import { Controller, UseGuards } from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { MarksService } from "./marks.service";

@ApiTags("marks")
@ApiBearerAuth()
@UseGuards(AuthGuard("jwt"))
@Controller("marks")
export class MarksController {
  constructor(private readonly marksService: MarksService) {}
}
