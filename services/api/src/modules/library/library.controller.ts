import { Controller, UseGuards } from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { LibraryService } from "./library.service";

@ApiTags("library")
@ApiBearerAuth()
@UseGuards(AuthGuard("jwt"))
@Controller("library")
export class LibraryController {
  constructor(private readonly libraryService: LibraryService) {}
}
