"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = __importDefault(require("../utils/Database"));
class ChecklistController {
    static async getAllChecklist(req, res) {
        const db = Database_1.default.getInstance();
        const checklists = await db.checklists.findMany();
        res.json(checklists);
    }
    static async createChecklist(req, res) {
        const { name } = req.body;
        const db = Database_1.default.getInstance();
        const checklist = await db.checklists.create({
            data: {
                name,
            },
        });
        res.json(checklist);
    }
    static async deleteChecklist(req, res) {
        const { id } = req.params;
        const db = Database_1.default.getInstance();
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
exports.default = ChecklistController;
