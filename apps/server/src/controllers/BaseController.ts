import express from 'express';

export class BaseController {

  protected send(res: express.Response, data: any, message: string) {
    res.json({
      success: true,
      message,
      data
    });
  }
}
