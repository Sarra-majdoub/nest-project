import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { UserService } from '../user/user.service';
import { randEmail, randUserName } from '@ngneat/falso';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const userService = app.get(UserService);

  for (let i = 0; i < 10; i++) {
    await userService.create({
      username: randUserName(),
      email: randEmail(),
      password: 'password123',
    });
  }

  console.log('✅ 10 users seeded!');
  await app.close();
}

bootstrap();
