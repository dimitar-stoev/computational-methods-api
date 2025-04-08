import { Module } from "@nestjs/common";
import { NumericalService } from "./numerical.service";
import { NumericalController } from "./numerical.controller";

@Module({
  providers: [NumericalService],
  controllers: [NumericalController],
})
export class NumericalModule {}
