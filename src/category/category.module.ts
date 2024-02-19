import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryResolver } from './graphql/category.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './domain/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  providers: [CategoryService, CategoryResolver],
})
export class CategoryModule {}
