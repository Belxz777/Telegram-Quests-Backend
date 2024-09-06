import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
declare const module: any;
// точка входа в приложение
async function bootstrap() {
  const port  = process.env.PORT || 5000 
  const app = await NestFactory.create(AppModule,{cors:true});
  // теперь для документации нашего rest api мы берем  и прописываем сетап свагера
  const config  =  new DocumentBuilder()
  .setTitle("Бэкенд для квест бота ")
.setVersion('1.0.1.')
.addTag("Бэкенд для квест бота ")
.build()
const document = SwaggerModule.createDocument(app,config);
SwaggerModule.setup('/api/doc',app,document)
await app.listen(port);
  console.log(`listening on port ${port}`)
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
