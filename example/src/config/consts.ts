import type { KeyboardAvoidingViewProps } from 'react-native';
import { Dimensions, Platform } from 'react-native';
import * as DeviceInfo from 'react-native-device-info';

/**
 * Platform constants
 */
export const DEVICE_MODEL: string = DeviceInfo.getModel();

export const PLATFORM_IS_ANDROID: boolean = Platform.OS === 'android';

export const PLATFORM_IS_IOS: boolean = Platform.OS === 'ios';

export const PLATFORM: string = PLATFORM_IS_ANDROID ? 'Android' : 'iOS';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('screen');

export { SCREEN_WIDTH, SCREEN_HEIGHT };

export const MAX_LENGTH_TEXT_BOX = 1000;

/**
 * Ratio width / height of banner images
 *
 * @type {number}
 */
export const RATIO: number = 296 / 343;

export const MARGIN_IMAGE = 2;

export const DEFAULT_KEYBOARD_HEIGHT = 346;

// ------------------------------------------------------------------------

/**
 * Date time constants
 */

export const KEYBOARD_AVOIDING_VIEW_BEHAVIOR: KeyboardAvoidingViewProps['behavior'] =
  PLATFORM_IS_IOS ? 'padding' : 'height';

export const DEVICE_TIME_FORMAT: string = 'HH:mm:ss';

export const DEVICE_DATE_TIME_FORMAT: string = 'DD/MM/YYYY - hh:mm';

export const DATE_FORMAT: string = 'DD/MM/YYYY';

export const DEFAULT_DATE: Date = new Date(0);

/**
 * Environment
 */

export const APP_SERVER_URL: string = process.env.APP_SERVER_URL!;

if (!APP_SERVER_URL) {
  throw new Error('Missing API_BASE_URL');
}

export const CODE_PUSH_DEPLOYMENT_KEY: string = Platform.select({
  android: process.env.CODE_PUSH_ANDROID_KEY,
  ios: process.env.CODE_PUSH_IOS_KEY,
})!;

export const SENTRY_DSN = process.env.SENTRY_DSN;

export const HERE_APP_ID: string = Platform.select({
  android: process.env.HERE_APP_ID_ANDROID,
  ios: process.env.HERE_APP_ID_IOS,
})!;

export const HERE_APP_CODE: string = Platform.select({
  android: process.env.HERE_APP_SECRET_ANDROID,
  ios: process.env.HERE_APP_SECRET_IOS,
})!;

export const END_REACHED_THRESHOLD: number = 0.5;

//const
export const HEIGHT_HEADER: number = 88;

//10MB
export const MAX_FILE_SIZE: number = 10485760;

export const IMAGE_DETAIL_STYLES = {
  height: SCREEN_WIDTH / 3 - 12,
  width: SCREEN_WIDTH / 3 - 12,
  marginRight: MARGIN_IMAGE,
  marginBottom: MARGIN_IMAGE,
};
