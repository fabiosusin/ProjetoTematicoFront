import { BaseApiOutput } from 'src/app/core/models/output/base-api-output';
import { Frequency } from './frequency';

export class FrequencyListOutput extends BaseApiOutput {
  frequencies?: Frequency[];
}
