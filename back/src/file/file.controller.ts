import {
  Controller,
  HttpCode,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { FileService } from './file.service'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { FileInterceptor } from '@nestjs/platform-express'

@Controller('files')
export class FileController {
  constructor(private readonly FileService: FileService) {}

  @Post()
  @HttpCode(200) //меняем дефолтный статус ответа сервера
  @Auth('admin')
  @UseInterceptors(FileInterceptor('image'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Query('folder') folder?: string
  ) {
    return this.FileService.saveFiles([file], folder)
  }
}
