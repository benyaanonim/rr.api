import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PartyService } from '../party.service';
import { PartyQueryRepo } from '../infrastructure/party.query-repo';
import { AdminGuard } from '../../common/guard/auth.guard';
import { PartyCreateInput } from './input/party-create.input';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { PartyUpdateInput } from './input/party-update.input';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Party } from '../domain/party.entity';

@ApiTags('Party')
@Controller('party')
export class PartyController {
  constructor(
    protected readonly partyService: PartyService,
    protected readonly partyQueryRepo: PartyQueryRepo,
  ) {}

  @Get()
  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Get all parties' })
  @ApiResponse({ status: 200, description: 'List of parties', type: [Party] })
  @ApiBearerAuth()
  async parties() {
    return this.partyQueryRepo.find();
  }

  @Post()
  @UseGuards(AdminGuard)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'logo', maxCount: 1 },
      { name: 'background', maxCount: 1 },
    ]),
  )
  @ApiOperation({ summary: 'Create a new party' })
  @ApiBody({ type: PartyCreateInput })
  @ApiResponse({ status: 201, description: 'Party created' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  async createParty(
    @Body() input: PartyCreateInput,
    @UploadedFile()
    files: {
      logo?: Express.Multer.File;
      background?: Express.Multer.File;
    },
  ) {
    input.logo = files.logo;
    input.background = files.background;
    return this.partyService.createParty(input);
  }

  @Put(':id')
  @UseGuards(AdminGuard)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'logo', maxCount: 1 },
      { name: 'background', maxCount: 1 },
    ]),
  )
  @ApiOperation({ summary: 'Update a party' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiBody({ type: PartyUpdateInput })
  @ApiResponse({ status: 204, description: 'Party updated' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'Party not found' })
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  async updateParty(
    @Param('id') id: number,
    @Body() input: PartyUpdateInput,
    @UploadedFile()
    files: {
      logo?: Express.Multer.File;
      background?: Express.Multer.File;
    },
  ) {
    input.logo = files.logo;
    input.background = files.background;
    return this.partyService.updateParty(id, input);
  }

  @Delete()
  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Delete a party' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({ status: 204, description: 'Party deleted' })
  @ApiResponse({ status: 404, description: 'Party not found' })
  @ApiBearerAuth()
  async deleteParty(@Param('id') id: number) {
    return this.partyService.deleteParty(id);
  }
}
