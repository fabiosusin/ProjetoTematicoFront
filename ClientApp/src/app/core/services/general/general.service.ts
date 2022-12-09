import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseApiRequestsService } from 'src/app/core/services/api/base-api-requests.service';
import { SessionService } from 'src/app/core/services/session/session.service';

@Injectable({ providedIn: 'root' })
export class GeneralService extends BaseApiRequestsService {
  constructor(
    protected session: SessionService,
    protected http: HttpClient
  ) {
    super(session, http);
    this.baseUrl = 'General/'
    this.mapLocationBaseUrl = this.baseUrl + 'MapLocation/'
    this.docsBaseUrl = this.baseUrl + 'Files/Doc/'
  }

  protected baseUrl: string;
  protected mapLocationBaseUrl: string;
  protected docsBaseUrl: string;
}
