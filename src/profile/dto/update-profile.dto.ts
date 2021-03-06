import { ApiProperty,PartialType } from '@nestjs/swagger';
import { CreateProfileDto } from './create-profile.dto';
import { IsString, IsUrl, Length } from 'class-validator';

class updatedto {
  @IsString()
  @Length(3, 10)
  @ApiProperty({
    description: 'Nome do perfil. Deve conter de 3 a 15 letras',
    example: 'Pedro',
  })
  title?: string;

  @IsUrl()
  @ApiProperty({
    description: 'Foto do perfil. Deve ser uma URL.',
    example:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcMrqyW43W_KoTq_nsfBnwuPn0FXvcTe2Kgw&usqp=CAU',
  })
  imageUrl?: string;
}
export class UpdateProfileDto extends PartialType(CreateProfileDto) {}
