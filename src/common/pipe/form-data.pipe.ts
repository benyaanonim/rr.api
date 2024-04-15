import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common'
import { validateOrReject } from 'class-validator'

@Injectable()
export class ParseFormDataPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    await validateOrReject(value, { groups: ['pre-parse'] })
    if (metadata.type === 'body') {
      try {
        if (value.sources) {
          value.sources = JSON.parse(value.sources)
        }
        if (value.tags) {
          // Преобразование строки в массив чисел
          value.tags = value.tags.map((tag) => parseInt(tag, 10))
        }
        if (value.categoryId) {
          value.categoryId = parseInt(value.categoryId, 10)
        }
      } catch (error) {
        console.error(error)
        throw new BadRequestException('Invalid input data')
      }
    }
    return value
  }
}
