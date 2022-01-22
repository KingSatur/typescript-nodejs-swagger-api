import { Request, Response, Router } from 'express';
import { countTasks, deleteTask, getTask, getTasks, saveTask, updateTask } from '../controller/task.controller';

const router = Router();

router.get('/task', getTasks);
router.get('/task/count', countTasks);
router.get('/task/:id', getTask);
router.delete('/task/:id', deleteTask);
router.post('/task', saveTask);
router.put('/task/:id', updateTask);

export default router;
