import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class UpdateAdminDto {
  @IsBoolean()
  @ApiProperty({
    description: 'Privilegios de Administrador',
    example: false,
  })
  isAdmin: boolean;
}