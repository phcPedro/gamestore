import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GendersService } from './genders.service';
import { CreateGenderDto } from './dto/create-gender.dto';
import { UpdateGenderDto } from './dto/update-gender.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('genders')
@Controller('genders')
export class GendersController {
  constructor(private readonly gendersService: GendersService) {}

  @Post()
  @ApiOperation({
    summary: 'Cria um gênero de game.',
  })
  create(@Body() createGenderDto: CreateGenderDto) {
    return this.gendersService.create(createGenderDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar todos os gêneros de games.',
  })
  findAll() {
    return this.gendersService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Localiza um gênero por ID.',
  })
  findOne(@Param('id') id: string) {
    return this.gendersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Atualiza um gênero por ID.',
  })
  update(@Param('id') id: string, @Body() updateGenderDto: UpdateGenderDto) {
    return this.gendersService.update(id, updateGenderDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Deleta um gênero por ID.',
  })
  delete(@Param('id') id: string) {
    return this.gendersService.delete(id);
  }
}
