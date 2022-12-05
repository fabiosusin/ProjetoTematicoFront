import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseApiRequestsService } from 'src/app/core/services/api/base-api-requests.service';
import { SessionService } from 'src/app/core/services/session/session.service';
import { BaseApiOutput } from 'src/app/core/models/output/base-api-output';
import { InterviewListOutput } from '../models/output/interview-list-output';
import { Interview } from '../models/output/interview';

@Injectable({ providedIn: 'root' })
export class InterviewService extends BaseApiRequestsService {
  constructor(
    protected session: SessionService,
    protected http: HttpClient
  ) {
    super(session, http);
  }
  baseUrl = 'Interview/';

  getList = async (): Promise<InterviewListOutput> => await this.post(this.baseUrl + 'list');

  getById = async (id: string): Promise<Interview> => await this.get(this.baseUrl + `get-by-id/${id}`);

  deleteInterview = async (id: string): Promise<BaseApiOutput> => await this.delete(this.baseUrl + `delete/${id}`);

  upsert = async (input: Interview): Promise<BaseApiOutput> => await this.post(this.baseUrl + 'upsert-Interview', input);

}
