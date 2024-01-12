import { Batch as BatchModel } from './model';
import { AppDataSource } from './orm';

abstract class AbstractRepository {
  abstract add(batch: BatchModel): Promise<void>;
  abstract get(ref: string): Promise<BatchModel>;
}

class TypeORMRepository extends AbstractRepository {
  async add(batch: BatchModel): Promise<void> {
    // use AppDataSource to add Batch
    await AppDataSource.getRepository('Batch').save(batch);
  }
  async get(ref: string): Promise<BatchModel> {
    // use AppDataSource to get Batch
    const entity = await AppDataSource.getRepository('Batch').findOne({
      where: { ref: ref },
    });
    return new BatchModel(entity.ref, entity.sku, entity.quantity);
  }
}

export { TypeORMRepository };
