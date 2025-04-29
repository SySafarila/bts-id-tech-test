"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const AuthController_1 = __importDefault(require("./controllers/AuthController"));
const ChecklistController_1 = __importDefault(require("./controllers/ChecklistController"));
const ChecklistItemController_1 = __importDefault(require("./controllers/ChecklistItemController"));
const auth_1 = __importDefault(require("./middlewares/auth"));
const errorHandler_1 = __importDefault(require("./utils/errorHandler"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get('/', (req, res) => {
    res.json({ message: 'Hello World!' });
});
// auth
app.post('/api/login', AuthController_1.default.login);
app.post('/api/register', AuthController_1.default.register);
// checklist
app.get('/api/checklist', auth_1.default, ChecklistController_1.default.getAllChecklist);
app.post('/api/checklist', auth_1.default, ChecklistController_1.default.createChecklist);
app.delete('/api/checklist/:id', auth_1.default, ChecklistController_1.default.deleteChecklist);
// checklist items
app.get('/api/checklist/:checklistId/item', auth_1.default, ChecklistItemController_1.default.getAllItems);
app.get('/api/checklist/:checklistId/item/:itemId', auth_1.default, ChecklistItemController_1.default.getItem);
app.put('/api/checklist/:checklistId/item/:itemId', auth_1.default, ChecklistItemController_1.default.updateStatusItem);
app.put('/api/checklist/:checklistId/item/rename/:itemId', auth_1.default, ChecklistItemController_1.default.renameItem);
app.delete('/api/checklist/:checklistId/item/:itemId', auth_1.default, ChecklistItemController_1.default.deleteItem);
app.post('/api/checklist/:checklistId/item', auth_1.default, ChecklistItemController_1.default.createItem);
app.use(errorHandler_1.default);
exports.default = app;
