import { Injectable } from '@nestjs/common'
import { FormRepo } from './infrastructure/form.repo'
import { CreateFormInput } from './api/input/create-form.input'
import { Form } from './domain/form.entity'
import { UpdateStatusFormInput } from './api/input/update-status-form.input'

@Injectable()
export class FormService {
  constructor(protected readonly formRepo: FormRepo) {}

  async createForm(body: CreateFormInput) {
    const form = new Form()
    form.name = body.name
    form.surname = body.surname
    form.email = body.email
    form.text = body.text
    form.createdAt = new Date()

    return this.formRepo.save(form)
  }

  async updateFormStatus(body: UpdateStatusFormInput, formId: number, adminName: string) {
    const form = await this.formRepo.findOne(formId)
    if (!form) {
      return null
    }

    form.status = body.status
    form.updatedBy = adminName
    form.updatedAt = new Date()

    return this.formRepo.save(form)
  }
}
