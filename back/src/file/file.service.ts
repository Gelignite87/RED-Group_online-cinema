import { Injectable } from '@nestjs/common'
import { FileResponse } from './file.interface'
import { path } from 'app-root-path'
import { ensureDir, writeFile } from 'fs-extra'

@Injectable()
export class FileService {
  async saveFiles(
    files: Express.Multer.File[],
    folder: string = 'default'
  ): Promise<FileResponse[]> {
    const uploadFolder = `${path}/uploads/${folder}` //определяем путь к папке
    await ensureDir(uploadFolder) //ensureDir проверяет есть ли папка, если нет - создает её
    const res: FileResponse[] = await Promise.all(
      //чтобы выполнить функцию .map() асинхронно нужно завернуть её в Promise.all()
      files.map(async (file) => {
        await writeFile(`${uploadFolder}/${file.originalname}`, file.buffer)
        return {
          url: `/uploads/${folder}/${file.originalname}`,
          name: file.originalname,
        }
      })
    )
    return res //возвращаем массив объектов
  }
}
