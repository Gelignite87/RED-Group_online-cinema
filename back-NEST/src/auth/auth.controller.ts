import { AuthService } from './auth.service'
import {
  HttpCode,
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { AuthDto } from './dto/auth.dto'
import { RefreshTokenDto } from './dto/refreshToken.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly AuthService: AuthService) {}

  @UsePipes(new ValidationPipe()) //валидация из файла dto
  @HttpCode(200) //меняем дефолтный статус ответа сервера
  @Post('login')
  async login(@Body() dto: AuthDto) {
    return this.AuthService.login(dto)
  }

  @UsePipes(new ValidationPipe()) //валидация из файла dto
  @HttpCode(200) //меняем дефолтный статус ответа сервера
  @Post('login/access-token')
  async getNewTokens(@Body() dto: RefreshTokenDto) {
    return this.AuthService.getNewTokens(dto)
  }

  @UsePipes(new ValidationPipe()) //валидация из файла dto
  @HttpCode(200) //меняем дефолтный статус ответа сервера
  @Post('register')
  async register(@Body() dto: AuthDto) {
    return this.AuthService.register(dto)
  }
}
