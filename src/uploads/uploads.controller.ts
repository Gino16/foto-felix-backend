import { Controller, Get, Param, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { join } from 'path/posix';
import { of } from 'rxjs';

@Controller('uploads')
export class UploadsController {
  @Get(':imagename')
  findImage(@Param('imagename') imagename: string, @Res() res) {
    return of(res.sendFile(join(process.cwd(), 'uploads/' + imagename)));
  }
}
