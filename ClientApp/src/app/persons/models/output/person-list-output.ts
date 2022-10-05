
import { BaseApiOutput } from 'src/app/core/models/output/base-api-output';
import { Person } from './person';

export class PersonListOutput extends BaseApiOutput {
  persons?: Person[];
}
