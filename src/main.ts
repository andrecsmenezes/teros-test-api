import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(new ValidationPipe())
  app.setGlobalPrefix('api')

  app.enableCors({
    origin: '*'
  })

  const options = new DocumentBuilder()
    .setTitle('API Teros')
    .setDescription('With love and dedication we build a best world')
    .setVersion('1.0')
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, options)

  SwaggerModule.setup('/docs', app, document)

  await app.listen( parseInt( ''+process.env.API_PORT ) )
}

bootstrap().catch( err => {
  console.log(err)
})
