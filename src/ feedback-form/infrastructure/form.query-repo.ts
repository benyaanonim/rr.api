import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { Form } from '../domain/form.entity';

@Injectable()
export class FormQueryRepo {
  constructor(protected readonly em: EntityManager) {}

  async find() {
    return this.em.find(Form);
  }

  async findOne(id: number) {
    return this.em.find(Form, { where: { id: id } });
  }
}
