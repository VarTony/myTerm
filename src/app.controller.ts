import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AppService } from './app.service';
const path = require('path');


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(
    @Req() req: Request,
    @Res() res: Response
    ): void {
    res.sendFile(path.join(__dirname, '../view/server007.html'));
    return
  }
}


// app.get('/',  (req, res) => {
// 	let cookie = req.headers.cookie;
// 	if(!req.headers.cookie) {
// 		cookie = newUserCreator.createNewUserId();
// 		newUserCreator.createNewUserDir(req, res, cookie);
// 	}
// 	else {
// 		cookie = cookie.split('=')[1].split(':')[1];
// 		if(!helpersOfTerm.searchUserDir(cookie)) {
// 				res.clearCookie('cookie');
// 				res.redirect('/');
// 				return;
// 		}
// 	}
// 	res.setHeader('Set-Cookie', `cookie=user:${cookie}`, {maxAge:  new Date(Date.now() + 1800)});
// 	res.sendFile(path.join(__dirname, 'view/server007.html'));
// });