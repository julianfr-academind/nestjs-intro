export class Product {
  public id: string = Math.random().toString();

  constructor(
    public title: string,
    public description: string,
    public price: number,
  ) { }
}
