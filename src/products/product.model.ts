import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
});

export interface ProductInterface {
  title: string;
  description: string;
  price: number;
}

export class Product implements ProductInterface {
  id: string;
  title: string;
  description: string;
  price: number;

  constructor(document: ProductDocument) {
    this.id = document.id;
    this.title = document.title;
    this.description = document.description;
    this.price = document.price;
  }
}

export interface ProductDocument extends mongoose.Document, ProductInterface { }
