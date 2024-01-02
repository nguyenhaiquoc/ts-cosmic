
class OutOfStocksException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'OutofStockException';
  }
}

export {OutOfStocksException}
