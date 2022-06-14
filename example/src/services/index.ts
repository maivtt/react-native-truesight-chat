import { useDownloadFile } from './use-download-file';

export class ExampleService {
  public readonly useDownloadFile = useDownloadFile;
}

export const exampleService: ExampleService = new ExampleService();
