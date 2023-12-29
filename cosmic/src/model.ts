class Batch {
  public getAvailabe(): number {
    return this.quantity;
  }

  constructor(
    public id: string,
    public sku: string,
    public quantity: number,
  ) {}

  public allocate(orderLine: OrderLine): void {
    if (orderLine.quantity <= this.quantity) {
      this.quantity -= orderLine.quantity;
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
