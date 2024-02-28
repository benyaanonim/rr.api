import { Injectable } from '@nestjs/common';
import { FormRepo } from './infrastructure/form.repo';
import { CreateFormInput } from './api/input/create-form.input';
import { Form } from './domain/form.entity';

@Injectable()
export class FormService {
  constructor(protected readonly formRepo: FormRepo) {}

  async createForm(body: CreateFormInput) {
    const form = new Form();
    form.name = body.name;
    form.email = body.email;
    form.text = body.text;

    return this.formRepo.save(form);
  }
}
