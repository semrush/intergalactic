import { join } from 'path';
import hbs from 'hbs';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

hbs.registerHelper('IS_PROD', () => {
  return process.env.NODE_ENV === 'production';
});

hbs.registerHelper('GA_TRACKING_ID', () => {
  return 'UA-6197637-47';
});

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(process.cwd(), './client/dist'), {
    immutable: true,
    // 24 hours
    maxAge: 60 * 60 * 24,
  });
  app.setBaseViewsDir(join(process.cwd(), './server/views'));
  hbs.registerPartials(join(process.cwd(), './server/views/partials'));
  app.setViewEngine('hbs');

  await app.listen(process.env.PORT || 3000);
}

bootstrap();
