import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from './domain/tag.entity';
import { TagService } from './tag.service';
import { TagController } from './api/tag.controller';
import { TagQueryRepo } from './infrastructure/tag.query-repo';
import { TagRepo } from './infrastructure/tag.repo';

@Module({
  imports: [TypeOrmModule.forFeature([Tag])],
  providers: [TagService, TagQueryRepo, TagRepo],
  controllers: [TagController],
})
export class TagModule {}
