import { Batch, OrderLine } from './model';

describe('Batch', () => {
    it('should create a new Batch object with the provided values', () => {
        const batch = new Batch("batch-001", "SMALL-TABLE", 20);
        expect(batch.id).toBe("batch-001");
        expect(batch.sku).toBe("SMALL-TABLE");
        expect(batch.quantity).toBe(20);
    });
});

describe('OrderLine', () => {
    it('should create a new OrderLine object with the provided values', () => {
        const orderLine = new OrderLine("order-123", "SMALL-TABLE", 2);
        expect(orderLine.id).toBe("order-123");
        expect(orderLine.sku).toBe("SMALL-TABLE");
        expect(orderLine.quantity).toBe(2);
    });
});

describe('Batch', () => {
    it('should allocate if available greater than required', () => {
        const batch = new Batch("batch-001", "SMALL-TABLE", 20);
        const orderLine = new OrderLine("order-123", "SMALL-TABLE", 2);
        batch.allocate(orderLine);
        expect(batch.available).toBe(18);
    });
})