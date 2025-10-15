import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { config } from 'dotenv';
config({ path: 'apps/api/.env' });

import { User } from './app/users/user.entity';
import { Task } from './app/tasks/task.entity';

const ds = new DataSource({
  type: 'sqlite',
  database: process.env.DB_PATH!,
  entities: [User, Task],
  synchronize: true
});

(async () => {
  await ds.initialize();
  const users = ds.getRepository(User);
  if (!(await users.findOne({ where: { email: 'demo@demo.com' } }))) {
    await users.save({
      email: 'demo@demo.com',
      passwordHash: await bcrypt.hash('demo123', 10),
      role: 'Owner'
    });
    console.log('Seeded: demo@demo.com / demo123');
  }
  await ds.destroy();
})();


