import { BaseApiOutput } from "src/app/core/models/output/base-api-output";
import { CompleteDateOutput } from "src/app/core/models/output/complete-date-output";

export class HomeDataOutput extends BaseApiOutput {
  equipment?: HomeDataItemInfo;
  person?: HomeDataItemInfo;
  equipmentsLoaned?: HomeDataItemInfo;
  date?: CompleteDateOutput;
}

export class HomeDataItemInfo {
  quantity?: number;
}
