import { Request, Response } from 'express';
import Database from '../utils/Database';
import HttpError from '../utils/HttpError';

export default class ChecklistItemController {
  static async getAllItems(req: Request, res: Response): Promise<void> {
    const { checklistId } = req.params;
    const db = Database.getInstance();
    const checklist = await db.checklists.findFirst({
      where: {
        id: checklistId,
      },
    });
    if (!checklist) {
      throw new HttpError(404, 'Checklist not found');
    }

    const items = await db.checklistItems.findMany({
      where: {
        checklist_id: checklistId,
      },
    });

    res.json(items);
  }

  static async createItem(req: Request, res: Response): Promise<void> {
    const { checklistId } = req.params;
    const { itemName } = req.body;

    const db = Database.getInstance();
    const checklist = await db.checklists.findFirst({
      where: {
        id: checklistId,
      },
    });
    if (!checklist) {
      throw new HttpError(404, 'Checklist not found');
    }

    const item = await db.checklistItems.create({
      data: {
        name: itemName,
        checklist_id: checklistId,
      },
    });

    res.json(item);
  }

  static async getItem(req: Request, res: Response): Promise<void> {
    const { checklistId, itemId } = req.params;
    const db = Database.getInstance();
    const checklist = await db.checklists.findFirst({
      where: {
        id: checklistId,
      },
    });
    if (!checklist) {
      throw new HttpError(404, 'Checklist not found');
    }

    const item = await db.checklistItems.findFirst({
      where: {
        id: itemId,
        checklist_id: checklistId,
      },
    });
    if (!item) {
      throw new HttpError(404, 'Item not found');
    }

    res.json(item);
  }

  static async updateStatusItem(req: Request, res: Response): Promise<void> {
    const { checklistId, itemId } = req.params;
    const db = Database.getInstance();
    const checklist = await db.checklists.findFirst({
      where: {
        id: checklistId,
      },
    });
    if (!checklist) {
      throw new HttpError(404, 'Checklist not found');
    }

    const item = await db.checklistItems.findFirst({
      where: {
        id: itemId,
        checklist_id: checklistId,
      },
    });
    if (!item) {
      throw new HttpError(404, 'Item not found');
    }

    const updatedItem = await db.checklistItems.update({
      where: {
        id: itemId,
      },
      data: {
        status: !item.status,
      },
    });

    res.json(updatedItem);
  }

  static async deleteItem(req: Request, res: Response): Promise<void> {
    const { checklistId, itemId } = req.params;
    const db = Database.getInstance();
    const checklist = await db.checklists.findFirst({
      where: {
        id: checklistId,
      },
    });
    if (!checklist) {
      throw new HttpError(404, 'Checklist not found');
    }

    const item = await db.checklistItems.findFirst({
      where: {
        id: itemId,
        checklist_id: checklistId,
      },
    });
    if (!item) {
      throw new HttpError(404, 'Item not found');
    }

    await db.checklistItems.delete({
      where: {
        id: itemId,
      },
    });

    res.json({
      message: 'Item deleted successfully',
    });
  }

  static async renameItem(req: Request, res: Response): Promise<void> {
    const { checklistId, itemId } = req.params;
    const { itemName } = req.body;

    const db = Database.getInstance();
    const checklist = await db.checklists.findFirst({
      where: {
        id: checklistId,
      },
    });
    if (!checklist) {
      throw new HttpError(404, 'Checklist not found');
    }

    const item = await db.checklistItems.findFirst({
      where: {
        id: itemId,
        checklist_id: checklistId,
      },
    });
    if (!item) {
      throw new HttpError(404, 'Item not found');
    }

    const updatedItem = await db.checklistItems.update({
      where: {
        id: itemId,
      },
      data: {
        name: itemName,
      },
    });

    res.json(updatedItem);
  }
}
