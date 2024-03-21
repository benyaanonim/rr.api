import { Module } from '@nestjs/common'
import { CategoryService } from './category.service'
import { CategoryController } from './api/category.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Category } from './domain/category.entity'
import { CategoryRepo } from './infrastructure/category.repo'
import { CategoryQueryRepo } from './infrastructure/category.query-repo'

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  providers: [CategoryService, CategoryRepo, CategoryQueryRepo],
  controllers: [CategoryController],
})
export class CategoryModule {}
