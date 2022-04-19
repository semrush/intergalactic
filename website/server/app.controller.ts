import { Controller, Post, Get, Next, Req, Res } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { Pool } from 'pg';

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

    if (req.header('host') === 'i.semrush.com') {
      return res.redirect('https://developer.semrush.com/intergalactic' + req.path);
    }

    return res.render('index', {
      ROOT_PATH: this.configService.get('ROOT_PATH', '/'),
    });
  }
}

@Controller('mailer')
export class Mailer {
  pool: any;

  constructor(private configService: ConfigService) {
    // TODO: use service
    this.pool = new Pool({
      connectionString: this.configService.get('POSTGRES_URL'),
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 20000,
    });
  }

  @Post('post')
  async sendEmail(@Res() res: Response, @Req() req: Request) {
    try {
      const client = await this.pool.connect();
      try {
        await client.query(
          `INSERT INTO email(created_at, email) VALUES (to_timestamp($1 / 1000.0), $2)`,
          [Date.now(), req.body.email],
        );
        res.json({
          success: true,
        });
      } catch (e) {
        res.json({
          success: false,
        });
      }
      client.release();
    } catch (e) {
      res.send(this.configService.get('POSTGRES_URL').split('/')[0]);
    }
  }
}
