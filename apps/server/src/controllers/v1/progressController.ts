import { Request, Response } from 'express';
import progressService from '@xp-app/services/progressService';

class ProgressController {
  async get(req: Request, res: Response) {
    const progress = await progressService.findAll();
    res.send(progress);
  }

  async post(req: Request, res: Response) {
    try {
      const { name } = req.body;
      await progressService.save(name);
      res.send('Created progress successfully!');
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
    }
  }

  async put(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const update = await progressService.update(BigInt(id), name);

      if (update['affectedRows'] === 0) {
        return res.status(404).send('Progress not found');
      }
      res.send('Updated progress successfully!');
    } catch (error) {
      console.error("error", error);
      res.status(500).send(error.message);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deleted = await progressService.delete(BigInt(id));

      if (deleted['affectedRows'] === 0) {
        return res.status(404).send('Progress not found');
      }
      res.send('Deleted progress successfully!');
    } catch (error) {
      console.error("error", error);
      res.status(500).send(error.message);
    }
  }
}

export const progressController = new ProgressController();
