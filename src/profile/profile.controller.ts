import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Profile')
@ApiBearerAuth()
@UseGuards(AuthGuard())
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  @ApiOperation({
    summary: 'Criar novo perfil.',
  })
  create(@Body() dto: CreateProfileDto) {
    return this.profileService.create(dto);
  }

  @Get('/profiles/:userId')
  @ApiOperation({ summary: 'Listar todos os perfis de determinado usuário.' })
  findAll(@Param('userId') id: string) {
    return this.profileService.findAll(id);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Visualizar um perfil pelo ID.',
  })
  findOne(@Param('id') id: string) {
    return this.profileService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Editar um perfil pelo ID.',
  })
  update(@Param('id') id: string, @Body() dto: UpdateProfileDto) {
    return this.profileService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Deletar um perfil pelo ID.',
  })
  delete(@Param('id') id: string) {
    return this.profileService.delete(id);
  }
}
