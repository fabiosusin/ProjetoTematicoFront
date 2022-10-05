import { PaginatorInput } from "src/app/core/models/input/paginator-input";
import { CompanyFilters } from "./company-filters-input";

export class CompanyFiltersInput {
  constructor() {
    this.filters = new CompanyFilters();
  }

  filters: CompanyFilters;
  paginator?: PaginatorInput;
}
