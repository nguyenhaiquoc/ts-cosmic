describe('AppDataSource', () => {
  it('should be available by issuing SELECT 1', async () => {
    await AppDataSource.initialize();
    await AppDataSource.query('SELECT 1');
    await AppDataSource.destroy();
  });
});
import { AppDataSource } from './orm';
