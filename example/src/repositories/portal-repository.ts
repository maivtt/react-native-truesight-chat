import { server } from '../config/server';
import { Repository } from 'react3l-common';
import { httpConfig } from '../config/repository';
import type { Observable } from 'rxjs';
import { map } from 'rxjs';
import type { AxiosResponse } from 'axios';
import nameof from 'ts-nameof.macro';
import kebabCase from 'lodash/kebabCase';

export class PortalRepository extends Repository {
  constructor() {
    super(httpConfig);
    server.subscribeServerUrl((serverUrl: string) => {
      this.baseURL = new URL('/rpc/portal/account/', serverUrl).href;
    });
  }

  public login = (): Observable<any> => {
    return this.http
      .post<any>(kebabCase(nameof(this.login)), {
        username: 'administrator',
        password: '123@123a',
        deviceName: 'Iphone',
      })
      .pipe(map((response: AxiosResponse<any>) => response.data));
  };
}

export const portalRepository: PortalRepository = new PortalRepository();
