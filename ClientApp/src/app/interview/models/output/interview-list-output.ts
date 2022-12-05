import { BaseApiOutput } from 'src/app/core/models/output/base-api-output';
import { Interview } from './interview';

export class InterviewListOutput extends BaseApiOutput {
  interviews?: Interview[];
}
