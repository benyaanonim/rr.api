import { Body, Controller, Delete, Get, NotFoundException, Param, Post } from '@nestjs/common'
import { HallQueryRepo } from '../infrastructure/hall.query-repo'
import { HallService } from '../hall.service'
import { HallCreateInput } from './input/hall.create.input'
import { TypeIdInput } from './input/type-id.input'
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger'
import { HallViewModel } from './output/hall.view.model'

@ApiTags('Halls')
@Controller('hall')
export class HallController {
  constructor(
    protected readonly hallQueryRepo: HallQueryRepo,
    protected readonly hallService: HallService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Retrieve all halls' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved all halls', type: [HallViewModel] })
  async getAll() {
    return this.hallQueryRepo.findAll()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single hall by ID' })
  @ApiParam({ name: 'id', required: true, description: 'The ID of the hall to retrieve', type: Number })
  @ApiResponse({ status: 200, description: 'Hall found and returned', type: HallViewModel })
  @ApiResponse({ status: 404, description: 'Hall not found' })
  async getHallById(@Param('id') id: number) {
    const result = await this.hallQueryRepo.findOne(id)
    if (!result) {
      throw new NotFoundException('Hall not found!')
    }
    return result
  }

  @Post()
  @ApiOperation({ summary: 'Create a new hall' })
  @ApiBody({ type: HallCreateInput })
  @ApiResponse({ status: 201, description: 'Hall successfully created' })
  async createHall(@Body() input: HallCreateInput) {
    return this.hallService.createHall(input)
  }

  @Post(':hallId/places/:placeId/assign-deputy')
  @ApiOperation({ summary: 'Assign a deputy to a place in a hall' })
  @ApiParam({ name: 'hallId', required: true, description: 'ID of the hall', type: Number })
  @ApiParam({ name: 'placeId', required: true, description: 'ID of the place in the hall', type: Number })
  @ApiBody({ type: TypeIdInput })
  @ApiResponse({ status: 200, description: 'Deputy successfully assigned to place' })
  @ApiResponse({ status: 404, description: 'Hall or place not found' })
  async assignDeputyToPlace(
    @Param('hallId') hallId: number,
    @Param('placeId') placeId: number,
    @Body() input: TypeIdInput,
  ) {
    const result = await this.hallService.seatToDeputy(hallId, placeId, input.id)
    if (!result) {
      throw new NotFoundException('Hall not found!')
    }
    return result
  }

  @Post(':hallId/places/:placeId/remove-deputy')
  @ApiOperation({ summary: 'Remove a deputy from a place in a hall' })
  @ApiParam({ name: 'hallId', required: true, description: 'ID of the hall', type: Number })
  @ApiParam({ name: 'placeId', required: true, description: 'ID of the place in the hall', type: Number })
  @ApiBody({ type: TypeIdInput })
  @ApiResponse({ status: 200, description: 'Deputy successfully removed from place' })
  @ApiResponse({ status: 404, description: 'Hall or place not found' })
  async removeDeputyForPlace(
    @Param('hallId') hallId: number,
    @Param('placeId') placeId: number,
    @Body() input: TypeIdInput,
  ) {
    const result = await this.hallService.removeDeputy(hallId, placeId, input.id)
    if (!result) {
      throw new NotFoundException('Hall not found!')
    }
    return result
  }

  @Delete(':hallId')
  @ApiOperation({ summary: 'Delete a hall' })
  @ApiParam({ name: 'hallId', required: true, description: 'ID of the hall to delete', type: Number })
  @ApiResponse({ status: 200, description: 'Hall successfully deleted' })
  @ApiResponse({ status: 404, description: 'Hall not found' })
  async deleteHall(@Param('hallId') hallId: number) {
    return this.hallService.deleteHall(hallId)
  }
}
