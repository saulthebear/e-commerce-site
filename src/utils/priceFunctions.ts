export function dbPriceToClientPrice(price: number): number {
  return price / 100;
}

export function clientPriceToDbPrice(price: number): number {
  return price * 100;
}

export function dbPriceToClientPriceString(price: number): string {
  return `$ ${dbPriceToClientPrice(price).toFixed(2)}`;
}
