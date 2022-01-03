import { Injectable } from '@nestjs/common';
import { UploadFileDto } from './dto/files.dto';

@Injectable()
export class FilesService {
  async uploadFile(file: UploadFileDto) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = { file: file.file };
        console.log(result.file);
        resolve(result);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }
}
