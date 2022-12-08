
import { BaseDataOutput } from "src/app/core/models/output/base-data-output";

export class Company extends BaseDataOutput {
  name?: string;
  cnpj?: string;
  socialReason?: string;
  address?: string;
  phone?: string;
  email?: string;
  registerDate?: Date
  disqualificationDate?: Date
}

