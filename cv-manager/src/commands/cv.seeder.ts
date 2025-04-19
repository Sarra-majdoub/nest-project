import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { CvService } from '../cv/cv.service';
import { UserService } from '../user/user.service';
import { SkillService } from '../skill/skill.service';
import {
  randEmail,
  randFullName,
  randPassword,
  randJobTitle,
  randFilePath,
  randNumber,
  randSkill,
} from '@ngneat/falso';
import { User } from '../user/entities/user.entity';
import { Skill } from '../skill/entities/skill.entity';
import { CreateUserDto } from '../user/dto/create-user.dto';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const userService = app.get(UserService);
  const skillService = app.get(SkillService);
  const cvService = app.get(CvService);

  // Seed users - spécifiez explicitement le type User[]
  const users: User[] = [];
  for (let i = 0; i < 5; i++) {
    const createUserDto: CreateUserDto = {
      username: randFullName(),
      email: randEmail(),
      password: randPassword()[0],
    };
    const user = await userService.create(createUserDto);
    users.push(user);
    console.log(`Created user: ${user.username}`);
  }

  // Seed skills - spécifiez explicitement le type Skill[]
  const skills: Skill[] = [];
  for (let i = 0; i < 10; i++) {
    const skill = await skillService.create({
      designation: randSkill(),
    });
    skills.push(skill);
    console.log(`Created skill: ${skill.designation}`);
  }

  // Seed CVs
  for (let i = 0; i < 20; i++) {
    const user = users[randNumber({ min: 0, max: users.length - 1 })];
    const selectedSkills: number[] = [];

    // Sélectionner 2-5 compétences aléatoires
    const skillCount = randNumber({ min: 2, max: 5 });
    for (let j = 0; j < skillCount; j++) {
      const skill = skills[randNumber({ min: 0, max: skills.length - 1 })];
      if (!selectedSkills.includes(skill.id)) {
        selectedSkills.push(skill.id);
      }
    }

    await cvService.createWithRelations(
      {
        name: randFullName().split(' ')[0],
        firstname: randFullName().split(' ')[1],
        age: randNumber({ min: 18, max: 60 }),
        cin: `AB${randNumber({ min: 10000, max: 99999 })}`,
        job: randJobTitle(),
        path: randFilePath(),
      },
      user.id,
      selectedSkills,
    );

    console.log(`Created CV ${i + 1}/20`);
  }

  await app.close();
  console.log('Seeding completed!');
}

bootstrap();
