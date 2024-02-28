import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { FormService } from '../form.service';
import { FormQueryRepo } from '../infrastructure/form.query-repo';
import { CreateFormInput } from './input/create-form.input';
import { Throttle } from '@nestjs/throttler';
import { AdminGuard } from '../../common/guard/auth.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Form } from '../domain/form.entity';

@ApiTags('feedback-form')
@Controller('feedback-form')
export class FormController {
  constructor(
    protected readonly formService: FormService,
    protected readonly formQueryRepo: FormQueryRepo,
  ) {}

  @Get()
  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Retrieve all feedback forms' })
  @ApiResponse({
    status: 200,
    description: 'List of feedback forms',
    type: [Form],
  })
  @ApiBearerAuth()
  async forms() {
    return this.formQueryRepo.forms();
  }

  @Throttle({ default: { limit: 86400, ttl: 1 } })
  @Post()
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 201, description: 'Feedback form created' })
  @ApiResponse({
    status: 429,
    description:
      'Limiting the number of creations of review forms, one per day',
  })
  @ApiOperation({
    summary: 'Create a new feedback form',
    description: 'This endpoint is throttled to limit the number of requests.',
  })
  @ApiBody({ type: CreateFormInput })
  async createForm(@Body() body: CreateFormInput) {
    return this.formService.createForm(body);
  }
}
