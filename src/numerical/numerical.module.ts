import { Module } from "@nestjs/common";
import { NumericalService } from "./numerical.service";

@Module({
  providers: [NumericalService],
})
export class NumericalModule {}
