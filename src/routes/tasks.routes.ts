import { Request, Response, Router } from 'express';
import { countTasks, deleteTask, getTask, getTasks, saveTask, updateTask } from '../controller/task.controller';

const router = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *   Task:
 *    type: object
 *    properties:
 *     id:
 *      type: string
 *      description: auto-generated id of the task
 *     name:
 *      type: string
 *      description: name of the task
 *     description:
 *      type: string
 *      description: Description of the task
 *    required:
 *      - name
 *      - description
 *    example:
 *      id: kwejro9123]a;sd-
 *      name: Example task
 *      description: I have to finish my homework
 *   TaskNotFound:
 *      type: object
 *      properties:
 *          msg:
 *              type: string
 *              description: 'Task not found'
 *      example:
 *          msg: Task not found
 *  parameters:
 *      taskId:
 *          in: path
 *          name: id
 *          required: true
 *          schema:
 *              type: string
 *          description: The task id
 */

/**
 * @swagger
 * tags:
 *  name: Task
 *  description: Tasks endpoints
 */

/**
 * @swagger
 * /task:
 *  get:
 *   summary: Return tasks list
 *   tags: [Task]
 *   responses:
 *    200:
 *     description: The list of tasks
 *     content:
 *      application/json:
 *       schema:
 *        type: array
 *        items:
 *          $ref: '#/components/schemas/Task'
 */
router.get('/task', getTasks);

/**
 * @swagger
 * /task/count:
 *  get:
 *   summary: Return the total of tasks
 *   tags: [Task]
 *   responses:
 *    200:
 *     description: The number of tasks
 *     content:
 *      text/plain:
 *       schema:
 *         type: integer
 *         example: 15
 */
router.get('/task/count', countTasks);

/**
 * @swagger
 * /task/{id}:
 *  get:
 *   summary: Return task by id
 *   tags: [Task]
 *   parameters:
 *      - $ref: '#/components/parameters/taskId'
 *   responses:
 *    200:
 *     description: Task by id
 *     content:
 *       application/json:
 *          schema:
 *             $ref: '#/components/schemas/Task'
 *    404:
 *     description: Task not found
 *     content:
 *      application/json:
 *          schema:
 *              $ref: '#/components/schemas/TaskNotFound'
 *
 */
router.get('/task/:id', getTask);

/**
 * @swagger
 * /task/{id}:
 *  delete:
 *   summary: Delete task by id
 *   tags: [Task]
 *   parameters:
 *      - $ref: '#/components/parameters/taskId'
 *   responses:
 *    200:
 *     description: Task was deleted successfully
 *     content:
 *       application/json:
 *          schema:
 *             $ref: '#/components/schemas/Task'
 *    404:
 *     description: Task not found
 *     content:
 *      application/json:
 *          schema:
 *              $ref: '#/components/schemas/TaskNotFound'
 *
 */
router.delete('/task/:id', deleteTask);

/**
 * @swagger
 * /task/:
 *  post:
 *   summary: Create a task
 *   tags: [Task]
 *   requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/Task'
 *   responses:
 *    200:
 *     description: The task was created successfully
 *     content:
 *       application/json:
 *          schema:
 *             $ref: '#/components/schemas/Task'
 *    500:
 *      description: There was a server internal error
 */
router.post('/task', saveTask);

/**
 * @swagger
 * /task/{id}:
 *  put:
 *   summary: Update task by id
 *   parameters:
 *      - $ref: '#/components/parameters/taskId'
 *   tags: [Task]
 *   requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/Task'
 *   responses:
 *    200:
 *     description: The task was created successfully
 *     content:
 *       application/json:
 *          schema:
 *             $ref: '#/components/schemas/Task'
 *    404:
 *     description: Task not found
 *     content:
 *      application/json:
 *          schema:
 *              $ref: '#/components/schemas/TaskNotFound'
 */
router.put('/task/:id', updateTask);

export default router;
