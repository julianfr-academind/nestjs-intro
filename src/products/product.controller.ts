import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ProductDocument } from './product.model';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly service: ProductsService) { }

  @Get()
  async all() {
    return await this.service.all();
  }

  @Post()
  async add(@Body('title') title: string, @Body('description') description: string, @Body('price') price: number) {
    return { id: await this.service.add(title, description, price) };
  }

  @Get(':id')
  async one(@Param('id') id: string) {
    return await this.service.one(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() product: ProductDocument) {
    return await this.service.update(id, product);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.service.delete(id);
  }

}
