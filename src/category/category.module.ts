import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './app/category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './domain/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  providers: [CategoryService],
  controllers: [CategoryController],
})
export class CategoryModule {}
