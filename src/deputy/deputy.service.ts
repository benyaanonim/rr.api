import { Injectable } from '@nestjs/common';
import { DeputyRepo } from './infrastructure/deputy.repo';
import { CreateDeputyInput } from './api/input/create-deputy.input';
import { Deputy } from './domain/deputy.entity';
import { AwsService } from '../aws/aws.service';
import { PartyQueryRepo } from '../party/infrastructure/party.query-repo';
import { ConvocationQueryRepo } from '../convocation/infrastructure/convocation.query-repo';
import { UpdateDeputyInput } from './api/input/update-deputy.input';
import { extractFileName } from '../helpers';

@Injectable()
export class DeputyService {
  constructor(
    protected readonly deputyRepo: DeputyRepo,
    protected readonly aws: AwsService,
    protected readonly pqr: PartyQueryRepo,
    protected readonly cqr: ConvocationQueryRepo,
  ) {}

  async createDeputy(input: CreateDeputyInput) {
    const photo = input.photo
      ? await this.aws.uploadFile(await input.photo)
      : null;
    const background = input.background
      ? await this.aws.uploadFile(await input.background)
      : null;

    const deputy = new Deputy();
    deputy.name = input.name;
    deputy.surname = input.surname;
    deputy.birthday = input.birthday;
    deputy.description = input.description;
    deputy.gender = input.gender;
    deputy.photo = photo;
    deputy.background = background;
    deputy.party = await this.pqr.findOne(input.partyId);
    deputy.convocations = await this.cqr.find(input.convocations);

    return this.deputyRepo.save(deputy);
  }

  async updateDeputy(input: UpdateDeputyInput, id: number) {
    const deputy = await this.deputyRepo.findOne(id);

    if (input.photo) {
      if (deputy.photo) {
        await this.aws.deleteImage(deputy.photo);
      }
      deputy.photo = await this.aws.uploadFile(await input.photo);
    }

    if (input.background) {
      if (deputy.background) {
        await this.aws.deleteImage(deputy.background);
      }
      deputy.background = await this.aws.uploadFile(await input.background);
    }

    deputy.name = input.name ?? deputy.name;
    deputy.surname = input.surname ?? deputy.surname;
    deputy.birthday = input.birthday ?? deputy.birthday;
    deputy.description = input.description ?? deputy.description;
    deputy.gender = input.gender ?? deputy.gender;
    deputy.party = input.partyId
      ? await this.pqr.findOne(input.partyId)
      : deputy.party;
    deputy.convocations = input.convocations
      ? await this.cqr.find(input.convocations)
      : deputy.convocations;

    return this.deputyRepo.save(deputy);
  }

  async deleteDeputy(id: number) {
    const deputy = await this.deputyRepo.findOne(id);
    if (deputy.photo) {
      const fileName = extractFileName(deputy.photo);
      await this.aws.deleteImage(fileName);
    }
    if (deputy.background) {
      const fileName = extractFileName(deputy.background);
      await this.aws.deleteImage(fileName);
    }

    return this.deputyRepo.delete(id);
  }
}
