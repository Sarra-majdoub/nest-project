import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CvService } from './cv.service';
import { CvController } from './cv.controller';
import { Cv } from './entities/cv.entity';
import { UserModule } from '../user/user.module';
import { SkillModule } from '../skill/skill.module';
//import { CvControllerV2 } from './cv.controller.v2';

@Module({
  imports: [TypeOrmModule.forFeature([Cv]), UserModule, SkillModule],
  controllers: [CvController,   /*CvControllerV2*/],
  providers: [CvService],
  exports: [CvService],
})
export class CvModule {}