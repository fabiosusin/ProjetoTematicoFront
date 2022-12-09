import { PaginatorInput } from "src/app/core/models/input/paginator-input";
import { FrequencyFilters } from "./frequency-filters-input";

export class FrequencyFiltersInput {
  constructor() {
    this.filters = new FrequencyFilters();
  }

  filters: FrequencyFilters;
  paginator?: PaginatorInput;
}
