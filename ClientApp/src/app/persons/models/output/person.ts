
import { BaseDataOutput } from "src/app/core/models/output/base-data-output";

export class Person extends BaseDataOutput {
  name?: string;
  cpfCnpj?: string;
  naturally?: string;
  motherName?: string;
  maritalStatus?: string;
  birthDay?: Date
}

