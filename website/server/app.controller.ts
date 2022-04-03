import { Controller, Post, Get, Next, Req, Res } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import mailchimp from '@mailchimp/mailchimp_marketing';
import { ConfigService } from '@nestjs/config';

require('dotenv').config();

@Controller()
export class AppController {
  constructor(private configService: ConfigService) {}

  @Post('/callback')
  callbackMonitoring(@Req() req: Request) {
    return 'true';
  }

  @Get('*')
  site(@Res() res: Response, @Next() next: NextFunction, @Req() req: Request) {
    if (req.path.includes('graphql')) return next();

    // if (req.header('host') === 'i.semrush.com') {
    //   return res.redirect('https://developer.semrush.com/intergalactic' + req.path);
    // }

    return res.render('index', {
      ROOT_PATH: this.configService.get('ROOT_PATH', '/'),
      host: req.header('host'),
    });
  }
}

@Controller('mailer')
export class Mailer {
  @Post('post')
  async sendEmail(@Res() res: Response, @Req() req: Request) {
    const listID = process.env.LISTID;
    mailchimp.setConfig({
      apiKey: process.env.MAILCHIMPKEY1,
      server: process.env.MAILCHIMPSERVER,
    });
    const email = req.body.email;
    const jsonData = {
      email_address: email,
      status: 'subscribed',
    };
    try {
      await mailchimp.lists.addListMember(listID, jsonData);
      res.json({
        success: true,
      });
    } catch (error) {
      console.error(error);
      res.json({
        success: false,
      });
    }
  }
}
