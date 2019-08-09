import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    ProductsModule,
    MongooseModule.forRoot('mongodb+srv://<user>:<password>@m0-large.mongodb.net/nestjs-demo?retryWrites=true&w=majority', { useNewUrlParser: true }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
