import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { CvService } from '../cv/cv.service';
import { UserService } from '../user/user.service';
import { SkillService } from '../skill/skill.service';
import {
  randFirstName,
  randLastName,
  randNumber,
  randAlphaNumeric,
  randJobTitle,
  rand,
} from '@ngneat/falso';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const cvService = app.get(CvService);
  const userService = app.get(UserService);
  const skillService = app.get(SkillService);

  const users = await userService.findAll();
  const skills = await skillService.findAll();

  for (let i = 0; i < 10; i++) {
    const randomUser = rand(users);
    const randomSkills = Array.from({ length: 3 }, () => rand(skills));

    await cvService.create({
      name: randLastName(),
      firstname: randFirstName(),
      age: randNumber({ min: 22, max: 60 }),
      cin: randAlphaNumeric({ length: 8 }).join(''),
      job: randJobTitle(),
      path: 'cv.pdf',
      userId: randomUser.id,
      skills: randomSkills.map((s) => s.id),
    });
  }

  console.log('✅ 10 CVs seeded with random users and skills!');
  await app.close();
}

bootstrap();
