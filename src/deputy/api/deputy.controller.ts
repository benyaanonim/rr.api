import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { DeputyService } from '../deputy.service'
import { DeputyQueryRepo } from '../infrastructure/deputy.query-repo'
import { AdminGuard } from '../../common/guard/auth.guard'
import { CreateDeputyInput } from './input/create-deputy.input'
import { FileFieldsInterceptor } from '@nestjs/platform-express'
import { UpdateDeputyInput } from './input/update-deputy.input'
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import { Deputy } from '../domain/deputy.entity'

@ApiTags('Deputy')
@Controller('deputy')
export class DeputyController {
  constructor(
    protected readonly deputyService: DeputyService,
    protected readonly deputyQueryRepo: DeputyQueryRepo,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all deputies' })
  @ApiResponse({
    status: 200,
    description: 'Return all deputies',
    type: [Deputy],
  })
  async deputies() {
    return this.deputyQueryRepo.find()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get deputy by id' })
  @ApiResponse({
    status: 200,
    description: 'Return deputy by id',
    type: Deputy,
  })
  @ApiResponse({
    status: 404,
    description: 'Deputy not found',
  })
  async getDeputyById(@Param('id') id: number) {
    const deputy = await this.deputyQueryRepo.findOne(id)
    if (!deputy) {
      throw new NotFoundException(`Deputy with this ID: ${id} was not found`)
    }
    return deputy
  }

  @Post()
  @UseGuards(AdminGuard)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'photo', maxCount: 1 },
      { name: 'background', maxCount: 1 },
    ]),
  )
  @ApiOperation({ summary: 'Create deputy' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Create a new deputy',
    type: CreateDeputyInput,
  })
  @ApiResponse({
    status: 201,
    description: 'The deputy has been successfully created.',
    type: Deputy,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  @ApiBearerAuth()
  async createDeputy(
    @Body() input: CreateDeputyInput,
    @UploadedFiles()
    files: {
      photo?: Express.Multer.File
      background?: Express.Multer.File
    },
  ) {
    input.photo = files.photo
    input.background = files.background
    return this.deputyService.createDeputy(input)
  }

  @Put(':id')
  @UseGuards(AdminGuard)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'photo', maxCount: 1 },
      { name: 'background', maxCount: 1 },
    ]),
  )
  @ApiOperation({ summary: 'Update deputy by id' })
  @ApiParam({ name: 'id', type: 'number', description: 'Deputy ID' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Update a deputy',
    type: UpdateDeputyInput,
  })
  @ApiResponse({
    status: 204,
    description: 'The deputy has been successfully updated.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  @ApiResponse({
    status: 404,
    description: 'Deputy not found',
  })
  @ApiBearerAuth()
  async updateDeputy(
    @Param('id') id: number,
    @Body() input: UpdateDeputyInput,
    @UploadedFiles()
    files: {
      photo?: Express.Multer.File
      backgroundImage?: Express.Multer.File
    },
  ) {
    input.photo = files.photo
    input.background = files.backgroundImage
    const deputy = await this.deputyService.updateDeputy(input, id)
    if (!deputy) {
      throw new NotFoundException(`Deputy with this ID: ${id} was not found`)
    }
    return deputy
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Delete deputy by id' })
  @ApiParam({ name: 'id', type: 'number', description: 'Deputy ID' })
  @ApiResponse({
    status: 204,
    description: 'The deputy has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Deputy not found' })
  @ApiBearerAuth()
  async deleteDeputy(@Param('id') id: number) {
    const deputy = await this.deputyService.deleteDeputy(id)
    if (!deputy) {
      throw new NotFoundException(`Deputy with this ID: ${id} was not found`)
    }
    return deputy
  }
}
