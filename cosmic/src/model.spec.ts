import { Batch, OrderLine } from './model';

describe('Batch', () => {
  it('should create a new Batch object with the provided values', () => {
    const batch = new Batch('batch-001', 'SMALL-TABLE', 20);
    expect(batch.id).toBe('batch-001');
    expect(batch.sku).toBe('SMALL-TABLE');
    expect(batch.getAvailabeQuantity()).toBe(20);
  });
});

describe('OrderLine', () => {
  it('should create a new OrderLine object with the provided values', () => {
    const orderLine = new OrderLine('order-123', 'SMALL-TABLE', 2);
    expect(orderLine.id).toBe('order-123');
    expect(orderLine.sku).toBe('SMALL-TABLE');
    expect(orderLine.quantity).toBe(2);
  });
});

describe('Check if Batch can allocate a order line or not', () => {
  const batch = new Batch('batch-001', 'SMALL-TABLE', 20);
  it('should be able to allocate if available greater than required', () => {
    const orderLine = new OrderLine('order-123', 'SMALL-TABLE', 2);
    expect(batch.canAllocate(orderLine)).toBe(true);
  });

  it('should not able to allowace if available greater than required', () => {
    const orderLine = new OrderLine('order-123', 'SMALL-TABLE', 21);
    expect(batch.canAllocate(orderLine)).toBe(false);
  });

  it('should not able to allowace if the sku is not match', () => {
    const orderLine = new OrderLine('order-123', 'DUMMY-TABLE', 20);
    expect(batch.canAllocate(orderLine)).toBe(false);
  });
});

describe('Allocate and deallocate a order line', () => {
  it('should allocate a order line (same sku) and deallocate', () => {
    const batch = new Batch('batch-001', 'SMALL-TABLE', 20);
    const orderLine = new OrderLine('order-123', 'SMALL-TABLE', 2);
    batch.allocate(orderLine);
    expect(batch.getAvailabeQuantity()).toBe(18);
    batch.deallocate(orderLine);
    expect(batch.getAvailabeQuantity()).toBe(20);
  });

  it('should not allocate a order line (different sku) and deallocate', () => {
    const batch = new Batch('batch-001', 'SMALL-TABLE', 20);
    const orderLine = new OrderLine('order-123', 'DUMMY-TABLE', 21);
    batch.allocate(orderLine);
    expect(batch.getAvailabeQuantity()).toBe(20);
    batch.deallocate(orderLine);
    expect(batch.getAvailabeQuantity()).toBe(20);
  });

  it('should allocate multiple order line (same sku) and deallocate', () => {
    const batch = new Batch('batch-001', 'SMALL-TABLE', 20);
    const orderLine1 = new OrderLine('order-123', 'SMALL-TABLE', 2);
    const orderLine2 = new OrderLine('order-123', 'SMALL-TABLE', 3);
    const orderLine3 = new OrderLine('order-123', 'SMALL-TABLE', 20);
    batch.allocate(orderLine1);
    expect(batch.getAvailabeQuantity()).toBe(18);
    batch.allocate(orderLine2);
    expect(batch.getAvailabeQuantity()).toBe(15);
    batch.allocate(orderLine3);
    expect(batch.getAvailabeQuantity()).toBe(15);
  });
});
