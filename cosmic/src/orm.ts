import { Column, DataSource, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Entity } from 'typeorm';

/* 
  TypeOrm: declare Batch and OrderLine as , using Allocation as a join table
  Batch has a one-to-many relationship with OrderLine
  OrderLine has a many-to-one relationship with Batch
*/
@Entity()
export class Batch {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ref: string;

  @Column()
  sku: string;

  @Column()
  quantity: number;
}

@Entity()
export class OrderLine {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sku: string;

  @Column()
  quantity: number;
}

@Entity()
export class Allocation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  createdAt: Date;

  @ManyToOne(() => Batch, (batch) => batch.id)
  batch: Batch;

  @ManyToOne(() => OrderLine, (orderLine) => orderLine.id)
  orderLine: OrderLine;
}

// define a postgresql data source
const AppDataSource = new DataSource({
  type: 'postgres',
  host: '127.0.0.1',
  port: 5432,
  username: 'test',
  password: 'test',
  database: 'test',
  synchronize: true,
  entities: [Batch, OrderLine, Allocation],
});

export { AppDataSource };
