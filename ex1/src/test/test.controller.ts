import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CreateTestDto } from './dto/create-test.dto';
import { UppercasePipe } from './pipes/uppercase.pipe';
import { FromHeader } from './decorators/from-header.decorator';


@Controller('test')
export class TestController {
  @Post()
  createTest(
    @Body() dto: CreateTestDto,
    @FromHeader('user-agent') userAgent: string,
  ) {
    return {
      data: dto,
      userAgent,
    };
  }

  @Get('upper/:name')
  upper(@Param('name', UppercasePipe) name: string) {
    return {
      result: name,
    };
  }
}
