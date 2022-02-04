import {
  Body,
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { arrayFiles, localOptions } from './multer.option';
import { ResponseInterceptor } from 'src/shared/response.interceptor';
import { UploadFileDto } from './dto/files.dto';
import { AuthGuard } from '@nestjs/passport';
@Controller('files')
@UseInterceptors(ResponseInterceptor)
@UseGuards(AuthGuard())
export class FilesController {
  constructor(private readonly fileService: FilesService) {}
  @Post('/upload')
  @UseInterceptors(FileFieldsInterceptor(arrayFiles, localOptions))
  async uploadFile(@Body() file: UploadFileDto) {
    return this.fileService.uploadFile(file);
  }
}
