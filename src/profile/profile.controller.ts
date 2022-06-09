import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('profile')
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}


  @Post()
  create(@Body() createProfileDto: CreateProfileDto) {
    return this.profileService.create(createProfileDto);
  }

  @Get()
  @ApiOperation({
    summary:"Lista todos os perfis de usarios cadastrados."
  })
  findAll() {
    return this.profileService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary:"Procura pelo Id um perfil usario cadastrado."
  })
  findOne(@Param('id') id: string) {
    return this.profileService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary:"Modifica as informações pelo Id de um perfil usuario já cadastrado."
  })
  update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profileService.update(id, updateProfileDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary:"Deleta pelo Id o perfil de um usuario já cadastrado."
  })
  remove(@Param('id') id: string) {
    return this.profileService.remove(id);
  }
}
