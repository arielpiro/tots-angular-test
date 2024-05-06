import { Inject, Injectable } from '@angular/core';
import { Client } from '../entities/client';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  TOTS_CORE_PROVIDER,
  TotsBaseHttpService,
  TotsCoreConfig,
  TotsListResponse,
} from '@tots/core';

export interface ClientsData {
  success: boolean;
  response: TotsListResponse<Client>;
}
export interface ClientData {
  success: boolean;
  response: Client;
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
    return this.http.get<Client>(
      '`${this.basePathUrl}/client/list/client/fetch/1757`'
    );
  }

  updateClient(client: Client) {
    console.log('updated', client);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post<ClientData>(
      `${this.basePathUrl}/client/save`,
      client,
      { headers }
    );
  }

  deleteClient(id: number) {
    return this.http.delete<Client>(`${this.basePathUrl}/client/remove/${id}`);
  }
}
