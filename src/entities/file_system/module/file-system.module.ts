import { Module } from '@nestjs/common';
import { FileSystemService } from '../service/file-system.service';


/**
 * Модуль для внутреннего низкоуровнего применения
 */
@Module({
    providers: [ FileSystemService ]
})
export class FileSystemModule {}
