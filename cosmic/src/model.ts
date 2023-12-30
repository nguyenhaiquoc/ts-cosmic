class Batch {
  private allocatedOrder: Set<OrderLine>;
  public getAvailabeQuantity(): number {
    return (
      this.quantity -
      Array.from(this.allocatedOrder).reduce(
        (sum, orderLine) => sum + orderLine.quantity,
        0,
      )
    );
  }

  constructor(
    public id: string,
    public sku: string,
    private quantity: number,
  ) {
    this.allocatedOrder = new Set();
  }

  public allocate(orderLine: OrderLine): void {
    if (this.canAllocate(orderLine)) {
      this.allocatedOrder.add(orderLine);
    }
  }

  public canAllocate(orderLine: OrderLine): boolean {
    return (
      this.sku == orderLine.sku &&
      orderLine.quantity <= this.getAvailabeQuantity()
    );
  }

  public deallocate(orderLine: OrderLine): void {
    if (this.allocatedOrder.has(orderLine)) {
      this.allocatedOrder.delete(orderLine);
    }
  }
}

class OrderLine {
  constructor(
    public id: string,
    public sku: string,
    public quantity: number,
  ) {}
}

export { Batch, OrderLine };
