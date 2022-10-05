import { PaginatorInput } from "src/app/core/models/input/paginator-input";
import { PersonFilters } from "./person-filters-input";

export class PersonFiltersInput {
  constructor() {
    this.filters = new PersonFilters();
  }

  filters: PersonFilters;
  paginator?: PaginatorInput;
}
