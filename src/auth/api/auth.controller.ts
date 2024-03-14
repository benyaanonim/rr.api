import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { AdminInput } from './input/admin.credentials.input';
import {
  ApiBody,
  ApiOperation,
  ApiProperty,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

class ResponseLogin {
  @ApiProperty({ description: 'JWT token' })
  accessToken: string;
}

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(protected readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Login as an admin' })
  @ApiResponse({
    status: 201,
    description: 'Admin logged in successfully',
    type: ResponseLogin,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiBody({ type: AdminInput })
  @Post('login')
  async login(@Body() body: AdminInput) {
    return this.authService.login(body);
  }
}
