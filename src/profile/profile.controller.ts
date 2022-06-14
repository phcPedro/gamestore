import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { LoggedUser } from 'src/auth/logged-user.decorator';

@ApiTags('profile')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('/my_account/profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}


  @Post('/create')
  @ApiOperation({
    summary:"Cria um novo perfil."
  })
  create( @LoggedUser()user: User, @Body() dto: CreateProfileDto) {
    return this.profileService.create(user.id, dto);
  }

  @Get()
  @ApiOperation({
    summary:"Lista todos os perfis de usarios cadastrados."
  })
  findAll(@LoggedUser()user: User) {
    return this.profileService.findAll(user.id);
  }

  @Get(':profileId')
  @ApiOperation({
    summary:"Procura pelo Id um perfil usario cadastrado."
  })
  findOne(@LoggedUser() user: User, @Param('profileId')id: string) {
    return this.profileService.findOne(user.id, id);
  }

  @Patch(':id')
  @ApiOperation({
    summary:"Modifica as informações pelo Id de um perfil usuario já cadastrado."
  })
  update(@LoggedUser() user: User, @Param('profileId') profileId: string,@Body()dto: UpdateProfileDto) {
    return this.profileService.update(user.id, profileId, dto);
  }

  @Delete(':id')
  @ApiOperation({
    summary:"Deleta pelo Id o perfil de um usuario já cadastrado."
  })
  remove(@LoggedUser() user:User, @Param('profileId')profileId: string) {
    return this.profileService.delete(user.id, profileId);
  }
}
