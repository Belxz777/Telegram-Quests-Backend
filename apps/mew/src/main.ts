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
  .setTitle("Используйте этот бекенд для админки ")
.setDescription('что бы его рзадеплоить нужно соаздать psg admin')
.setVersion('1.0.1.')
.addTag("Bell -x")
.build()
const document = SwaggerModule.createDocument(app,config);
SwaggerModule.setup('/api/doc',app,document)
await app.listen(port);
  console.log(`listening on port ${port}`)
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
  /*
  
   {
        "question": "Формат для хранения картинок без фона?",
        "answer": "ПНГ",
        "variants": [
            "ПНГ",
            "JPEG",
            "JPG",
            "SVG"[]'
        ],
        "hardness": "medium",
       "lat": "56.833516",
        "lon": " 53.128926",
        "author":"Artem",
        "quizIn": "NearHome",
        "categorie":"Айти"
    }
  */
}
bootstrap();
