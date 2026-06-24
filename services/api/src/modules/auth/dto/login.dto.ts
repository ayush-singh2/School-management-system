import { IsEmail, IsString, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
  @ApiProperty({ example: "teacher@school.edu" })
  @IsEmail()
  email: string;

  @ApiProperty({ example: "secret123" })
  @IsString()
  @MinLength(6)
  password: string;
}
