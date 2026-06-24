import { Controller, UseGuards } from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { TransportService } from "./transport.service";

@ApiTags("transport")
@ApiBearerAuth()
@UseGuards(AuthGuard("jwt"))
@Controller("transport")
export class TransportController {
  constructor(private readonly transportService: TransportService) {}
}
