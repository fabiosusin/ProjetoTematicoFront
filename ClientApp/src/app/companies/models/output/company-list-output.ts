import { BaseApiOutput } from 'src/app/core/models/output/base-api-output';
import { Company } from './company';

export class CompanyListOutput extends BaseApiOutput {
  companies?: Company[];
}
