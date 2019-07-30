import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Product } from './product.model';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly service: ProductsService) { }

  @Get()
  all(): Product[] {
    return this.service.all();
  }

  @Post()
  add(@Body('title') title: string, @Body('description') description: string, @Body('price') price: number): any {
    return { id: this.service.add(title, description, price) };
  }

  @Get(':id')
  one(@Param('id') id: string): Product {
    return this.service.one(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() product: Product) {
    return this.service.update(id, product);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.delete(id);
  }

}
