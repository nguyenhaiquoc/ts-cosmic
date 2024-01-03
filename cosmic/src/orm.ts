import { DataSource } from 'typeorm';

// define a postgresql data source
const AppDataSource = new DataSource({
  type: 'postgres',
  host: '127.0.0.1',
  port: 5432,
  username: 'test',
  password: 'test',
  database: 'test',
});

export { AppDataSource };
