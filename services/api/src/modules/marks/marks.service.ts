import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class MarksService {
  constructor(private readonly prisma: PrismaService) {}
}
