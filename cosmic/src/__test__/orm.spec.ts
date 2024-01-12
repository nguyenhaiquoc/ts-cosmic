import { AppDataSource } from '../orm';

beforeAll(async () => {
  await AppDataSource.initialize();

  // lean up database
  await AppDataSource.dropDatabase();

  // sync again
  await AppDataSource.synchronize();
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

describe('Insert data to Batch table and query back', () => {
  it('Insert data to Batch table and query back', async () => {
    // insert 3 record to batch table by using raw qeury then query back using Bacth model
    const sql = `INSERT INTO batch (ref, sku, quantity) VALUES ('batch1', 'sku1', 100), ('batch2', 'sku2', 200), ('batch3', 'sku3', 300);`;
    await AppDataSource.query(sql);
    const result = await AppDataSource.query(`SELECT * FROM batch;`);
    expect(result.length).toBe(3);
    const batch2 = await AppDataSource.query(
      `SELECT * FROM batch WHERE ref = 'batch2';`,
    );
    expect(batch2[0].id).toBe(2);
    expect(batch2[0].ref).toBe('batch2');

    // use Batch entity to query batch3
    const batch3 = await AppDataSource.getRepository('Batch').findOne({
      where: { ref: 'batch3' },
    });
    expect(batch3.id).toBe(3);
    expect(batch3.ref).toBe('batch3');

    // insert batch4 using Batch entity and query back to check
    const batch4 = await AppDataSource.getRepository('Batch').create({
      ref: 'batch4',
      sku: 'sku4',
      quantity: 400,
    });
    await AppDataSource.getRepository('Batch').save(batch4);
    const batch4Query = await AppDataSource.getRepository('Batch').findOne({
      where: { ref: 'batch4' },
    });
    expect(batch4Query.id).toBe(4);
  });
});

afterAll(async () => {
  await AppDataSource.destroy();
});
