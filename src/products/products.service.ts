import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  one(id: string): Product {
    const product = this.products.find(p => p.id === id);

    if (!product) { throw new NotFoundException('Product not found'); }

    return { ...product };
  }

  all(): Product[] {
    return [...this.products];
  }

  update(id: string, product: Product) {
    const current = this.products.find(p => p.id === id);

    if (product.title !== undefined) { current.title = product.title; }
    if (product.description !== undefined) { current.description = product.description; }
    if (product.price !== undefined) { current.price = product.price; }

    return { ...current };
  }

  add(title: string, description: string, price: number) {
    const product = new Product(title, description, price);

    this.products.push(product);

    return product.id;
  }

  delete(id: string) {
    const index = this.products.findIndex(p => p.id === id);

    if (index !== -1) { this.products.splice(index, 1); }
  }
}
