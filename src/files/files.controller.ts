import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { arrayFiles, localOptions } from './multer.option';
import { ResponseInterceptor } from 'src/shared/response.interceptor';
import { UploadFileDto } from './dto/files.dto';
@Controller('files')
@UseInterceptors(ResponseInterceptor)
export class FilesController {
  constructor(private readonly fileService: FilesService) {}
  @Post('/upload')
  @UseInterceptors(FileFieldsInterceptor(arrayFiles, localOptions))
  async uploadFile(@Body() file: UploadFileDto) {
    return this.fileService.uploadFile(file);
  }
}
