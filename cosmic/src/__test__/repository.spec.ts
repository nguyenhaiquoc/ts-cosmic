import { AppDataSource } from '../orm';
import { Batch as BatchModel, OrderLine as OrderLineModel } from '../model';
import { TypeORMRepository } from '../repository';

beforeAll(async () => {
  await AppDataSource.initialize();
  // lean up database
  await AppDataSource.dropDatabase();
  // sync again
  await AppDataSource.synchronize();
});

describe('Batch Repository', () => {
  it('Be able to save pure batch model and get back', async () => {
    const batches = [
      new BatchModel('batch1', 'sku1', 100),
      new BatchModel('batch2', 'sku2', 200),
      new BatchModel('batch3', 'sku3', 300),
    ];
    const repository = new TypeORMRepository();
    for (const batch of batches) {
      await repository.add(batch);
      const batchInDB = await repository.get(batch.ref);
      expect(batchInDB.ref).toBe(batch.ref);
      expect(batchInDB.getAvailabeQuantity()).toBe(batch.getAvailabeQuantity());
      expect(batchInDB.sku).toBe(batch.sku);
    }
  });

  it('Be able to save allocated batch and get back', async () => {
    const batch = new BatchModel('batch_allocated', 'sku100', 30);
    const order_line = new OrderLineModel('order_line1', 'sku100', 10);
    // check if batch can allocate order_line
    expect(batch.canAllocate(order_line)).toBe(true);
    // allocate order_line to batch
    batch.allocate(order_line);
    // save batch to database

    const repository = new TypeORMRepository();
    await repository.add(batch);
    // get batch back from database
    const batchInDB = await repository.get(batch.ref);
    // check if batchInDB has allocated order_line
    expect(batchInDB.getAvailabeQuantity()).toBe(20);
    expect(batchInDB.sku).toBe('sku100');
    expect(batchInDB.ref).toBe('batch_allocated');
  });
});

afterAll(async () => {
  await AppDataSource.destroy();
});
