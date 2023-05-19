import {
  Controller,
  HttpCode,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common'
import { FileService } from './file.service'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { FilesInterceptor } from '@nestjs/platform-express'

@Controller('files')
export class FileController {
  constructor(private readonly FileService: FileService) {}

  @Post()
  @HttpCode(200) //меняем дефолтный статус ответа сервера
  @Auth('admin')
  @UseInterceptors(FilesInterceptor('file', 10)) //на клиенте добавляем в formData файлы с ключом 'file'
  async uploadFile(
    @UploadedFiles() files: Express.Multer.File[], //описываем массив файлов, получаемых в теле запроса
    @Query('folder') folder?: string //описываем query параметр
  ) {
    return this.FileService.saveFiles(files, folder)
  }
}
