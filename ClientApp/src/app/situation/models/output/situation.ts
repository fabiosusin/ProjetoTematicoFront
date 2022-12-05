
import { BaseDataOutput } from "src/app/core/models/output/base-data-output";

export class Situation extends BaseDataOutput {
  processNumber?: number;
  varaOrigem?: string;
  convictionQuantity?: number;
  convictionType?: number;
  prdType?: number;
  finePrice?: number;
  prdToDo?: number;
  crimeType?: number;
  nonCriminalProsecutionAgreement?: boolean;
  originalPenalty?: number;
  totalDays?: number;
  fulfilledHours?: number;
  remainingHours?: number;
}

