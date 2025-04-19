// import {
//   Controller,
//   Post,
//   Body,
//   Req,
//   Patch,
//   Param,
//   Delete,
//   Get,
// } from '@nestjs/common';
// import { CvService } from './cv.service';
// import { CreateCvDto } from './dto/create-cv.dto';
// import { Request } from 'express';
// //import { UserService } from 'src/user/user.service';
// import { UpdateCvDto } from './dto/update-cv.dto';

// @Controller({
//   version: '2',
// })
// export class CvControllerV2 {
//   constructor(
//     private readonly cvService: CvService,
//    // private readonly userService: UserService,
//   ) {}

//   @Post()
//   create(@Body() createCvDto: CreateCvDto, @Req() req: Request) {
//     return this.cvService.createForUser(createCvDto, req['userId']);
//   }

//   @Patch(':id')
//   update(
//     @Param('id') id: string,
//     @Body() updateCvDto: UpdateCvDto,
//     @Req() req: Request,
//   ) {
//     return this.cvService.updateForUser(+id, updateCvDto, req['userId']);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string, @Req() req: Request) {
//     return this.cvService.deleteForUser(+id, req['userId']);
//   }
// }
