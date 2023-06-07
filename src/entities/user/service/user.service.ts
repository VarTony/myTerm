import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class UserService {


    async createUserDir(userName: string): Promise<any> {
        const userDir: string = path.join(process.env.USER_DIRECTORIES, userName);

        await fs.mkdir(userDir, err => console.warn(err));
        
        // process.env.USER_DIR_TEMPLATE

    await fs.copyFile('./user.service.ts', userDir, err => console.warn(err))
    }
}
