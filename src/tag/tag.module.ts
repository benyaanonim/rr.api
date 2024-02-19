import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from './domain/tag.entity';
import { TagService } from './tag.service';
import { TagResolver } from './graphql/tag.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Tag])],
  providers: [TagResolver, TagService],
})
export class TagModule {}
