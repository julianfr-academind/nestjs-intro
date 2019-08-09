import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'bson';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './product.model';

@Injectable()
export class ProductsService {
  constructor(@InjectModel('Product') private readonly model: Model<ProductDocument>) { }

  async one(id: string) {
    if (!ObjectId.isValid(id)) { throw new BadRequestException('Invalid id'); }

    const product = await this.model.findById(id).exec();

    if (!product) { throw new NotFoundException('Product not found'); }

    return new Product(product);
  }

  async all() {
    const products = await this.model.find().exec();

    return products.map(p => new Product(p));
  }

  async update(id: string, product: ProductDocument) {
    if (!ObjectId.isValid(id)) { throw new BadRequestException('Invalid id'); }

    const current = await this.model.findById(id).exec();

    if (product.title !== undefined) { current.title = product.title; }
    if (product.description !== undefined) { current.description = product.description; }
    if (product.price !== undefined) { current.price = product.price; }

    await current.save();

    return new Product(current);
  }

  async add(title: string, description: string, price: number) {
    const product = new this.model({ title, description, price });

    const result = await product.save();

    return result.id as string;
  }

  async delete(id: string) {
    if (!ObjectId.isValid(id)) { throw new BadRequestException('Invalid id'); }

    const product = await this.model.findById(id).exec();

    if (!product) { throw new NotFoundException('Product not found'); }

    await product.remove();
  }
}
