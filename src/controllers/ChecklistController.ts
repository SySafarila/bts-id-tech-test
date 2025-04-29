import { Request, Response } from 'express';
import Database from '../utils/Database';

export default class ChecklistController {
  static async getAllChecklist(req: Request, res: Response): Promise<void> {
    const db = Database.getInstance();
    const checklists = await db.checklists.findMany();

    res.json(checklists);
  }

  static async createChecklist(req: Request, res: Response): Promise<void> {
    const { name } = req.body;
    const db = Database.getInstance();
    const checklist = await db.checklists.create({
      data: {
        name,
      },
    });

    res.json(checklist);
  }

  static async deleteChecklist(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const db = Database.getInstance();
    await db.checklists.delete({
      where: {
        id: id,
      },
    });

    res.json({
      message: 'Checklist deleted successfully',
    });
  }
}
