import { Repository } from 'react3l-common';
import { httpConfig } from '../config/repository';
import { serverUrl } from '../config/server';

export class BaseHttpRepository extends Repository {
  constructor() {
    super(httpConfig);
    serverUrl.subscribe((url: string) => {
      this.baseURL = url;
    });
  }
}
