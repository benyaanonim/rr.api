import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Form } from './domain/form.entity'
import { FormService } from './form.service'
import { FormRepo } from './infrastructure/form.repo'
import { FormQueryRepo } from './infrastructure/form.query-repo'
import { FormController } from './api/form.controller'

@Module({
  imports: [TypeOrmModule.forFeature([Form])],
  providers: [FormService, FormRepo, FormQueryRepo],
  controllers: [FormController],
})
export class FormModule {}
