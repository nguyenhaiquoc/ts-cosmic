
class Batch {
  public available: number;
  constructor(public id: string, public sku: string, public quantity: number) {
    this.available = quantity;
  }
  public allocate(orderLine: OrderLine): void{
    if (orderLine.quantity <= this.quantity) {
      this.quantity -= orderLine.quantity;
    }
    this.available = this.quantity;
  }
}

class OrderLine {
  constructor(public id: string, public sku: string, public quantity: number) {}
}


export { Batch, OrderLine };
