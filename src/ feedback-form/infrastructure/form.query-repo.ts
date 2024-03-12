import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { Form } from '../domain/form.entity';

@Injectable()
export class FormQueryRepo {
  constructor(protected readonly em: EntityManager) {}

  async forms() {
    return this.em.find(Form);
  }
}
