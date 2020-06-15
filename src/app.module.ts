import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://admin:Pokidex@pokedex-kaf7p.mongodb.net/pokedex?retryWrites=true&w=majority',
      { useNewUrlParser: true },
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
