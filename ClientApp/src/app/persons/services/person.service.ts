import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseApiRequestsService } from 'src/app/core/services/api/base-api-requests.service';
import { SessionService } from 'src/app/core/services/session/session.service';
import { BaseApiOutput } from 'src/app/core/models/output/base-api-output';
import { PersonFiltersInput } from '../models/input/person-list-input';
import { PersonListOutput } from '../models/output/person-list-output';
import { Person } from '../models/output/person';
import { OpenFileOutput } from 'src/app/core/models/output/open-file-output';
import { ImportFile } from 'src/app/core/models/input/import-file';

@Injectable({ providedIn: 'root' })
export class PersonService extends BaseApiRequestsService {
  constructor(
    protected session: SessionService,
    protected http: HttpClient
  ) {
    super(session, http);
  }
  baseUrl = 'Person/';

  getList = async (input: PersonFiltersInput): Promise<PersonListOutput> => await this.post(this.baseUrl + 'list', input);
  getByDocument = async (cpfCnpj: string): Promise<Person> => await this.get(this.baseUrl + `get-by-document/${cpfCnpj}`);
  deletePerson = async (id: string): Promise<BaseApiOutput> => await this.delete(this.baseUrl + `delete/${id}`);
  upsert = async (input: Person): Promise<BaseApiOutput> => await this.post(this.baseUrl + 'upsert-Person', input);
  export = async (): Promise<OpenFileOutput> => await this.get(this.baseUrl + 'export');
  import = async (data: ImportFile): Promise<BaseApiOutput> => await this.post(this.baseUrl + 'import', data);
}
