import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiResponse } from '@nestjs/swagger';

// @ApiExcludeEndpoint()
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiResponse({ description: 'default endpoint' })
  getHello(): string {
    return this.appService.getHello();
  }
}
