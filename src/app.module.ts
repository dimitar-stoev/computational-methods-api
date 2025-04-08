import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { NumericalModule } from "./numerical/numerical.module";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [NumericalModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
