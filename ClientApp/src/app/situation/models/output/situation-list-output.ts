import { BaseApiOutput } from 'src/app/core/models/output/base-api-output';
import { Situation } from './situation';

export class SituationListOutput extends BaseApiOutput {
  situations?: Situation[];
}
