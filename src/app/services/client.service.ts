import { Inject, Injectable } from '@angular/core';
import { Client } from '../entities/client';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  TOTS_CORE_PROVIDER,
  TotsBaseHttpService,
  TotsCoreConfig,
} from '@tots/core';

export interface ClientsData {
  success: boolean;
  response: Response;
}

export interface Response {
  current_page: number;
  data: Client[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Link[];
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: null;
  to: number;
  total: number;
}

export interface Link {
  url: null | string;
  label: string;
  active: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ClientService extends TotsBaseHttpService<Client> {
  constructor(
    @Inject(TOTS_CORE_PROVIDER) protected override config: TotsCoreConfig,
    protected override http: HttpClient
  ) {
    super(config, http);
    this.basePathUrl = 'https://agency-coda.uc.r.appspot.com';
  }

  getClientsList() {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post<ClientsData>(
      `${this.basePathUrl}/client/list`,
      {},
      { headers }
    );
  }

  getClient() {
    return this.http.get('`${this.basePathUrl}/client/list/client/fetch/1757`');
  }
}
