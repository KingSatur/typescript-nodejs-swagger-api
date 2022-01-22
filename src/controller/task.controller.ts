import { Handler, Request, Response } from 'express';
import { nanoid } from 'nanoid';
import { getConnection, Task } from '../db';

export const getTasks: Handler = function (req: Request, res: Response) {
  const tasks: Task[] = getConnection().get('tasks').value();
  return res.json(tasks);
};

export const saveTask: Handler = async function (req: Request, res: Response) {
  const body = req.body;
  const newTask: Task = {
    id: nanoid(),
    ...body,
  };
  try {
    await getConnection().get('tasks').push(newTask).write();
    return res.json(newTask);
  } catch (error) {
    return res.status(500).send(String(error));
  }
};

export const getTask: Handler = async function (req: Request, res: Response) {
  const { id } = req.params;

  const task: Task = await getConnection()
    .get('tasks')
    .find((m) => m?.id === id)
    .value();
  return res.status(task ? 200 : 404).json(task ? task : { message: 'Task not found' });
};

export const deleteTask: Handler = async function (req: Request, res: Response) {
  const { id } = req.params;
  const task: Task = await getConnection()
    .get('tasks')
    .find((m) => m?.id === id)
    .value();
  if (task) {
    const removedTask = (await getConnection().get('tasks').remove({ id }).write())?.[0];
    return res.status(200).json(removedTask);
  } else {
    return res.status(400).json({ message: 'Task not found' });
  }
};

export const updateTask: Handler = async function (req: Request, res: Response) {
  const { id } = req.params;
  const body = req.body;
  const task: Task = await getConnection()
    .get('tasks')
    .find((m) => m?.id === id)
    .value();
  if (task) {
    console.log(body);

    const udpatedTask = await getConnection().get('tasks').find({ id }).assign(body).write();
    return res.status(200).json(udpatedTask);
  } else {
    return res.status(400).json({ message: 'Task not found' });
  }
};
export const countTasks: Handler = async function (req: Request, res: Response) {
  const tasksLength: number = getConnection().get('tasks').value().length;
  return res.json(tasksLength);
};
