import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { CvService } from '../cv/cv.service';
import { createFakeCVs } from './faker-utils';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const cvService = app.get(CvService);

  const fakeCVs = createFakeCVs(10); 

    for (const cv of fakeCVs) {
      console.log('Seeding CV:', cv);
      await cvService.create(cv);
      console.log('✅ Seeded!');
  }
  await app.close();
}
bootstrap();
