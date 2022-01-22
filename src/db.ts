import Lowdb from 'lowdb';
import FileAsync from 'lowdb/adapters/FileAsync';

export type Task = {
  id: string;
  name: string;
  description: string;
};

type Schema = {
  tasks: Task[];
};

let db: Lowdb.LowdbAsync<Schema>;

export const createConnection = async function () {
  const adapter = new FileAsync<Schema>('db.json');
  db = await Lowdb(adapter);

  await db
    .defaults({
      tasks: [
        {
          h: '',
        },
      ],
    })
    .write();
};

export const getConnection = () => db;
