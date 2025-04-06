import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { NumericalModule } from "./numerical/numerical.module";

@Module({
  imports: [NumericalModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
