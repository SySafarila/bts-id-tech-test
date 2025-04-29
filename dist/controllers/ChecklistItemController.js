"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = __importDefault(require("../utils/Database"));
const HttpError_1 = __importDefault(require("../utils/HttpError"));
class ChecklistItemController {
    static async getAllItems(req, res) {
        const { checklistId } = req.params;
        const db = Database_1.default.getInstance();
        const checklist = await db.checklists.findFirst({
            where: {
                id: checklistId,
            },
        });
        if (!checklist) {
            throw new HttpError_1.default(404, 'Checklist not found');
        }
        const items = await db.checklistItems.findMany({
            where: {
                checklist_id: checklistId,
            },
        });
        res.json(items);
    }
    static async createItem(req, res) {
        const { checklistId } = req.params;
        const { itemName } = req.body;
        const db = Database_1.default.getInstance();
        const checklist = await db.checklists.findFirst({
            where: {
                id: checklistId,
            },
        });
        if (!checklist) {
            throw new HttpError_1.default(404, 'Checklist not found');
        }
        const item = await db.checklistItems.create({
            data: {
                name: itemName,
                checklist_id: checklistId,
            },
        });
        res.json(item);
    }
    static async getItem(req, res) {
        const { checklistId, itemId } = req.params;
        const db = Database_1.default.getInstance();
        const checklist = await db.checklists.findFirst({
            where: {
                id: checklistId,
            },
        });
        if (!checklist) {
            throw new HttpError_1.default(404, 'Checklist not found');
        }
        const item = await db.checklistItems.findFirst({
            where: {
                id: itemId,
                checklist_id: checklistId,
            },
        });
        if (!item) {
            throw new HttpError_1.default(404, 'Item not found');
        }
        res.json(item);
    }
    static async updateStatusItem(req, res) {
        const { checklistId, itemId } = req.params;
        const db = Database_1.default.getInstance();
        const checklist = await db.checklists.findFirst({
            where: {
                id: checklistId,
            },
        });
        if (!checklist) {
            throw new HttpError_1.default(404, 'Checklist not found');
        }
        const item = await db.checklistItems.findFirst({
            where: {
                id: itemId,
                checklist_id: checklistId,
            },
        });
        if (!item) {
            throw new HttpError_1.default(404, 'Item not found');
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
    static async deleteItem(req, res) {
        const { checklistId, itemId } = req.params;
        const db = Database_1.default.getInstance();
        const checklist = await db.checklists.findFirst({
            where: {
                id: checklistId,
            },
        });
        if (!checklist) {
            throw new HttpError_1.default(404, 'Checklist not found');
        }
        const item = await db.checklistItems.findFirst({
            where: {
                id: itemId,
                checklist_id: checklistId,
            },
        });
        if (!item) {
            throw new HttpError_1.default(404, 'Item not found');
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
    static async renameItem(req, res) {
        const { checklistId, itemId } = req.params;
        const { itemName } = req.body;
        const db = Database_1.default.getInstance();
        const checklist = await db.checklists.findFirst({
            where: {
                id: checklistId,
            },
        });
        if (!checklist) {
            throw new HttpError_1.default(404, 'Checklist not found');
        }
        const item = await db.checklistItems.findFirst({
            where: {
                id: itemId,
                checklist_id: checklistId,
            },
        });
        if (!item) {
            throw new HttpError_1.default(404, 'Item not found');
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
exports.default = ChecklistItemController;
