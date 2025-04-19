import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CvService } from './cv.service';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { Cv } from './entities/cv.entity';
import { SearchCvDto } from './dto/search-cv.dto';
//import { PaginationDto } from 'src/shared/pagination.dto';

@Controller({
  version: '1',
})
export class CvController {
  constructor(private readonly cvService: CvService) {}

  @Post()
  create(@Body() createCvDto: CreateCvDto) {
    const cv = { ...createCvDto } as Cv;
    return this.cvService.create(cv);
  }

  @Get()
  async findAll(
    @Query() searchCvDto: SearchCvDto,
    //@Query() paginationDto: PaginationDto,
  ) {
    if (searchCvDto.search || searchCvDto.age) {
      return this.cvService.search(searchCvDto);
    }
    //return this.cvService.findAllPaginated(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cvService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCvDto: UpdateCvDto) {
    return this.cvService.update(+id, updateCvDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cvService.remove(+id);
  }
}
