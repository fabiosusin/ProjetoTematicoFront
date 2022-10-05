import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseApiRequestsService } from 'src/app/core/services/api/base-api-requests.service';
import { SessionService } from 'src/app/core/services/session/session.service';
import { BaseApiOutput } from 'src/app/core/models/output/base-api-output';
import { CompanyFiltersInput } from '../models/input/company-list-input';
import { CompanyListOutput } from '../models/output/company-list-output';
import { Company } from '../models/output/company';

@Injectable({ providedIn: 'root' })
export class CompanyService extends BaseApiRequestsService {
  constructor(
    protected session: SessionService,
    protected http: HttpClient
  ) {
    super(session, http);
  }
  baseUrl = 'Company/';

  getList = async (input: CompanyFiltersInput): Promise<CompanyListOutput> => await this.post(this.baseUrl + 'list', input);

  getByDocument = async (cpfCnpj: string): Promise<Company> => await this.get(this.baseUrl + `get-by-document/${cpfCnpj}`);

  deleteCompany = async (id: string): Promise<BaseApiOutput> => await this.delete(this.baseUrl + `delete/${id}`);

  upsert = async (input: Company): Promise<BaseApiOutput> => await this.post(this.baseUrl + 'upsert-Company', input);

}
