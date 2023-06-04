import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('api') //везде будет добавляться глобальный префикс api
  app.enableCors() //отменяем запрет оправки запросов с браузера, находящегося на другом домене
  await app.listen(4200)
}
bootstrap()
