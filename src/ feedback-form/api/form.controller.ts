import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
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
import { UpdateStatusFormInput } from './input/update-status-form.input';
import { Actor } from '../../common/decorators/actor.decrator';

@ApiTags('Feedback-form')
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
    return this.formQueryRepo.find();
  }

  @Get(':id')
  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Return feedback form by id' })
  @ApiResponse({
    status: 200,
    description: 'feedback form by id',
    type: Form,
  })
  @ApiResponse({
    status: 404,
    description: 'Form not found',
  })
  @ApiBearerAuth()
  async getFormById(@Param('id') id: number) {
    const form = await this.formQueryRepo.findOne(id);
    if (!form) {
      throw new NotFoundException(
        `Feedback form for this ID: ${id} not found `,
      );
    }
    return form;
  }

  @Post()
  @Throttle(1, 86400)
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

  @Put(':formId')
  @UseGuards(AdminGuard)
  @ApiOperation({
    summary: 'Update a status feedback form',
    description: 'This endpoint is throttled to limit the number of requests.',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 201, description: 'Feedback form status update' })
  @ApiResponse({
    status: 429,
    description: 'Rate limit',
  })
  @ApiBody({ type: UpdateStatusFormInput })
  async updateStatusForm(
    @Param('formId') formId: number,
    @Body() body: UpdateStatusFormInput,
    @Actor() actor,
  ) {
    const form = await this.formService.updateFormStatus(
      body,
      formId,
      actor.sub,
    );
    if (!form) {
      throw new NotFoundException(
        `Feedback form for this ID: ${formId} not found `,
      );
    }
    return form;
  }
}
