import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, UseGuards } from '@nestjs/common'
import { ConvocationService } from '../convocation.service'
import { ConvocationQueryRepo } from '../infrastructure/convocation.query-repo'
import { AdminGuard } from '../../common/guard/auth.guard'
import { ConvocationCreateInput } from './input/convocation-create.input'
import { ConvocationUpdateInput } from './input/convocation-update.input'
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Convocation } from '../domain/convocation.entity'

@ApiTags('Convocation')
@Controller('convocation')
export class ConvocationController {
  constructor(
    protected readonly convocationService: ConvocationService,
    protected readonly convocationQueryRepo: ConvocationQueryRepo,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all convocations' })
  @ApiResponse({
    status: 200,
    description: 'List of convocations',
    type: [Convocation],
  })
  async convocations() {
    return this.convocationQueryRepo.findMany()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get convocation by id' })
  @ApiResponse({
    status: 200,
    description: 'Get convocation by id',
    type: Convocation,
  })
  @ApiResponse({
    status: 404,
    description: 'Convocation not found',
  })
  async getConvocationById(@Param('id') id: number) {
    const convocation = await this.convocationQueryRepo.findOne(id)
    if (!convocation) {
      throw new NotFoundException(`Convocation with this ID: ${id} was not found`)
    }
    return convocation
  }

  @Post()
  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new convocation' })
  @ApiBody({ type: ConvocationCreateInput })
  @ApiResponse({ status: 201, description: 'Convocation created' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async createConvocation(@Body() input: ConvocationCreateInput) {
    return this.convocationService.convocationCreate(input)
  }

  @Put(':id')
  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a convocation' })
  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
    description: 'Convocation ID',
  })
  @ApiBody({ type: ConvocationUpdateInput })
  @ApiResponse({ status: 200, description: 'Convocation updated' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'Convocation not found' })
  async updateConvocation(@Param('id') id: number, @Body() input: ConvocationUpdateInput) {
    const convocation = await this.convocationService.convocationUpdate(id, input)
    if (!convocation) {
      throw new NotFoundException(`Convocation with this ID: ${id} was not found`)
    }
    return convocation
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a convocation' })
  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
    description: 'Convocation ID',
  })
  @ApiResponse({ status: 200, description: 'Convocation deleted' })
  @ApiResponse({ status: 404, description: 'Convocation not found' })
  async deleteConvocation(@Param('id') id: number) {
    const convocation = await this.convocationService.convocationDelete(id)
    if (!convocation) {
      throw new NotFoundException(`Convocation with this ID: ${id} was not found`)
    }
    return convocation
  }
}
