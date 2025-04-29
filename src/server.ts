import cors from 'cors';
import express, { Request, Response } from 'express';
import AuthController from './controllers/AuthController';
import ChecklistController from './controllers/ChecklistController';
import ChecklistItemController from './controllers/ChecklistItemController';
import authMiddleware from './middlewares/auth';
import errorHandler from './utils/errorHandler';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Hello World!' });
});

// auth
app.post('/api/login', AuthController.login);
app.post('/api/register', AuthController.register);

// checklist
app.get('/api/checklist', authMiddleware, ChecklistController.getAllChecklist);
app.post('/api/checklist', authMiddleware, ChecklistController.createChecklist);
app.delete(
  '/api/checklist/:id',
  authMiddleware,
  ChecklistController.deleteChecklist,
);

// checklist items
app.get(
  '/api/checklist/:checklistId/item',
  authMiddleware,
  ChecklistItemController.getAllItems,
);
app.get(
  '/api/checklist/:checklistId/item/:itemId',
  authMiddleware,
  ChecklistItemController.getItem,
);
app.put(
  '/api/checklist/:checklistId/item/:itemId',
  authMiddleware,
  ChecklistItemController.updateStatusItem,
);
app.put(
  '/api/checklist/:checklistId/item/rename/:itemId',
  authMiddleware,
  ChecklistItemController.renameItem,
);
app.delete(
  '/api/checklist/:checklistId/item/:itemId',
  authMiddleware,
  ChecklistItemController.deleteItem,
);
app.post(
  '/api/checklist/:checklistId/item',
  authMiddleware,
  ChecklistItemController.createItem,
);

app.use(errorHandler);

export default app;
