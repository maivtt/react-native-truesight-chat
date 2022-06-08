import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Repository } from 'react3l-common';
import { Platform } from 'react-native';
import nameof from 'ts-nameof.macro';
import { APP_SERVER_URL, DEVICE_MODEL, PLATFORM } from './consts';
import { showError } from '../helpers/toast-helper';
import { globalState } from '../app';

const ContentType = 'Content-Type';

export const httpConfig: AxiosRequestConfig = {
  baseURL: APP_SERVER_URL,
  headers: {
    [ContentType]: 'application/json',
  },
};

Repository.requestInterceptor = (config: AxiosRequestConfig) => {
  const token = globalState.token;
  const refreshToken = globalState.refreshToken;

  if (token) {
    Object.assign(config.headers!, {
      Cookie: `${nameof(token)}=${token};RefreshToken=${refreshToken}`,
    });
  }

  config.headers = {
    ...config.headers,
    'X-Device-Model': `${DEVICE_MODEL}`,
    'X-Platform': `${PLATFORM}`,
    'X-Platform-Version': `${Platform.Version}`,
    'X-Timezone': `${-new Date().getTimezoneOffset() / 60}`,
  };

  if (config.data instanceof FormData) {
    config.headers![ContentType] = 'multipart/form-data';
    return config;
  }

  if (typeof config.data === 'object') {
    config.headers![ContentType] = 'application/json';
    config.data = JSON.stringify(config.data);
  }

  return config;
};

/**
 * Transform response data
 *
 * @param response {AxiosResponse}
 */
Repository.responseInterceptor = async (response: AxiosResponse) => {
  return response;
};

/**
 * Handle request error
 *
 * @param error {AxiosError}
 *
 * @throws {AxiosError}
 */
Repository.errorInterceptor = async (error: AxiosError): Promise<void> => {
  if (error?.response?.status) {
    switch (error?.response?.status) {
      case 400:
        if (
          typeof error.response.data === 'object' &&
          error.response.data !== null
        ) {
          // if (__DEV__) {
          //   const message = Object.values(error.response.data)[0];
          //   showError(`Lỗi ${message}`);
          // }
        }
        break;

      case 401:
        break;

      case 403:
        showError('Bạn không có quyền thực hiện hành động này');
        break;

      case 420:
        if (__DEV__) {
          showError('Lỗi 420');
        }
        break;

      case 500:
        showError('Lỗi 500');
        break;

      case 502:
        showError('Lỗi 502');
        break;
    }
  }

  // Sentry.captureException(error);
  throw error;
};
