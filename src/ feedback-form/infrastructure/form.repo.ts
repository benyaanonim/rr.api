import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { Form } from '../domain/form.entity';

@Injectable()
export class FormRepo {
  constructor(protected readonly em: EntityManager) {}

  async save(form: Form) {
    return this.em.save(form);
  }
}
