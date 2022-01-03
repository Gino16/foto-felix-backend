import { IsString, IsNotEmpty } from 'class-validator';
export class UploadFileDto {
  @IsString()
  @IsNotEmpty()
  file: string;
}
