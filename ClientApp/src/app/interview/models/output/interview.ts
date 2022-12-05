
import { BaseDataOutput } from "src/app/core/models/output/base-data-output";

export class Interview extends BaseDataOutput {
  familyIncome?: number
  neighborhood?: string;
  city?: string;
  street?: string;
  complement?: string;
  phone?: string;
  streetNumber?: string;
  educationDegree?: string;
  workSkills?: number;
  consumesAlcohol?: boolean
  serviceHours?: Date;
}
