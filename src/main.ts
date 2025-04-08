import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as process from "node:process";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: process.env.corsUrl,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  });
  await app.listen(3000);
}
bootstrap();
