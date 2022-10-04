import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ format: 'email' })
  // Validation
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty()
  // Validation
  @IsNotEmpty()
  @IsString()
  username: string;
}
