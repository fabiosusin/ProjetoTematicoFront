
import { BaseDataOutput } from "src/app/core/models/output/base-data-output";

export class Frequency extends BaseDataOutput {
  activity?: string
  entryTime?: Date
  exitTime?: Date
  activityTotalTime?: number;
  fulfilledHours?: number;
  remainingHours?: number;
  appear?: boolean
}

