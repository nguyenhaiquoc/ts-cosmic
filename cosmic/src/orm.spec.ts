import { AppDataSource } from './orm';

beforeAll(async () => {
  await AppDataSource.initialize();
});

describe('AppDataSource', () => {
  it('should be available by issuing SELECT 1', async () => {
    await AppDataSource.query('SELECT 1');
  });
});

describe('check if table exist', () => {
  // use test table technique to check if bacth, orderline, allocation table exist
  it('check if table exist', async () => {
    const tablename = ['batch', 'order_line', 'allocation'];
    for (let i = 0; i < tablename.length; i++) {
      const result = await AppDataSource.query(
        `SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = '${tablename[i]}');`,
      );
      expect(result[0].exists).toBe(true);
    }
  });
});

afterAll(async () => {
  await AppDataSource.destroy();
});
