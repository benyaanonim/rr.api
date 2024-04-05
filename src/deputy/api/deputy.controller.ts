import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
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
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import { Deputy } from '../domain/deputy.entity'
import { CreateOtherInfoInput } from './input/create.other-info.input'
import { UpdateRatingInput } from './input/update.rating'
import { QueryFilterDeputy } from './input/query-filter.deputy'

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
  async deputies(@Query() filter: QueryFilterDeputy) {
    return this.deputyQueryRepo.find(filter)
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

  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: 'number', description: 'Deputy ID' })
  @ApiOperation({ summary: 'Create OtherInfo for a Deputy' })
  @ApiResponse({ status: 201, description: 'OtherInfo created' })
  @ApiResponse({ status: 404, description: 'Deputy not found' })
  @Post(':id/other-info')
  @UseGuards(AdminGuard)
  async createOtherInfo(@Param('id') id: number, @Body() input: CreateOtherInfoInput) {
    const otherInfo = await this.deputyService.createOtherInfo(id, input)
    if (!otherInfo) {
      throw new NotFoundException('Deputy is not found')
    }
    return otherInfo
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete OtherInfo of a Deputy' })
  @ApiResponse({ status: 204, description: 'OtherInfo deleted' })
  @ApiResponse({ status: 404, description: 'OtherInfo or Deputy not found' })
  @Delete(':deputyId/other-info/:id')
  @UseGuards(AdminGuard)
  async deleteOtherInfo(@Param('deputyId') deputyId: number, @Param('id') otherInfoId: number) {
    const result = await this.deputyService.deleteOtherInfo(deputyId, otherInfoId)
    if (!result) {
      throw new NotFoundException('OtherInfo or Deputy not found')
    }
    return result
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update deputy rating info' })
  @ApiResponse({ status: 204, description: 'Rating update' })
  @ApiResponse({ status: 404, description: 'Rating or Deputy not found' })
  @ApiParam({ name: 'deputyId', type: 'number', description: 'Deputy ID' })
  @ApiBody({ type: UpdateRatingInput })
  @Put(':deputyId/rating')
  @UseGuards(AdminGuard)
  async updateRatingDeputy(@Body() input: UpdateRatingInput, @Param('deputyId') id: number) {
    const result = await this.deputyService.updateRating(id, input)
    if (!result) {
      throw new NotFoundException('Deputy not found')
    }
    return result
  }
}
