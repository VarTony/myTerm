import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class UserService {


    async createUserDir(userName: string): Promise<any> {
        const usersPlace: string = process.env.USER_DIRECTORIES;

        await fs.mkdir(path.join(usersPlace, userName), err => console.warn(err));
    }
}
