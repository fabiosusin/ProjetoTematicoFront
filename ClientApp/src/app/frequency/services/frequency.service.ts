import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseApiRequestsService } from 'src/app/core/services/api/base-api-requests.service';
import { SessionService } from 'src/app/core/services/session/session.service';
import { BaseApiOutput } from 'src/app/core/models/output/base-api-output';
import { FrequencyListOutput } from '../models/output/frequency-list-output';
import { Frequency } from '../models/output/frequency';
import { OpenFileOutput } from 'src/app/core/models/output/open-file-output';
import { ImportFile } from 'src/app/core/models/input/import-file';
import { FrequencyFiltersInput } from '../models/input/frequency-list-input';

@Injectable({ providedIn: 'root' })
export class FrequencyService extends BaseApiRequestsService {
  constructor(
    protected session: SessionService,
    protected http: HttpClient
  ) {
    super(session, http);
  }
  baseUrl = 'Frequency/';

  getList = async (input: FrequencyFiltersInput): Promise<FrequencyListOutput> => await this.post(this.baseUrl + 'list', input);
  getById = async (id: string): Promise<Frequency> => await this.get(this.baseUrl + `get-by-id/${id}`);
  deleteFrequency = async (id: string): Promise<BaseApiOutput> => await this.delete(this.baseUrl + `delete/${id}`);
  upsert = async (input: Frequency): Promise<BaseApiOutput> => await this.post(this.baseUrl + 'upsert-Frequency', input);
  export = async (input: FrequencyFiltersInput): Promise<OpenFileOutput> => await this.post(this.baseUrl + 'export', input);
  report = async (input: FrequencyFiltersInput): Promise<OpenFileOutput> => await this.post(this.baseUrl + 'report', input);
  import = async (data: ImportFile): Promise<BaseApiOutput> => await this.post(this.baseUrl + 'import', data);
}
