import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseApiRequestsService } from 'src/app/core/services/api/base-api-requests.service';
import { SessionService } from 'src/app/core/services/session/session.service';
import { BaseApiOutput } from 'src/app/core/models/output/base-api-output';
import { SituationListOutput } from '../models/output/situation-list-output';
import { Situation } from '../models/output/situation';

@Injectable({ providedIn: 'root' })
export class SituationService extends BaseApiRequestsService {
  constructor(
    protected session: SessionService,
    protected http: HttpClient
  ) {
    super(session, http);
  }
  baseUrl = 'Situation/';

  getList = async (): Promise<SituationListOutput> => await this.post(this.baseUrl + 'list');

  getByNumber = async (number: number): Promise<Situation> => await this.get(this.baseUrl + `get-by-number/${number}`);

  deleteSituation = async (id: string): Promise<BaseApiOutput> => await this.delete(this.baseUrl + `delete/${id}`);

  upsert = async (input: Situation): Promise<BaseApiOutput> => await this.post(this.baseUrl + 'upsert-Situation', input);

}
