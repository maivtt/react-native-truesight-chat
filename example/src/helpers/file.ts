import { server } from '../config/server';
import { PLATFORM_IS_ANDROID, PLATFORM_IS_IOS } from '../config/consts';
import type { ImageSourcePropType } from 'react-native';
import buildUrl from 'build-url';
import type { LocalImage } from '../core/LocalImage';
import { DocumentType } from '../../../src/types/DocumentType';

export function fileURICleaner(uri: string): string {
  let cleanedURI: string = uri;
  if (PLATFORM_IS_IOS) {
    if (uri.startsWith('file://')) {
      cleanedURI = uri.replace('file://', '');
      return cleanedURI;
    }
  }
  if (PLATFORM_IS_ANDROID) {
    if (!cleanedURI.startsWith('file://')) {
      cleanedURI = `file://${cleanedURI}`;
    }
    return cleanedURI;
  }
  return cleanedURI;
}

export function getFileURIForUploading(uri: string): string {
  return uri.replace('file://', '');
}

export function getFileNameForUploading(path: string): string {
  const index: number = path.lastIndexOf('/');
  return path.slice(index + 1);
}

export function convertPathToUri(path: string): string {
  const uri = path.split('/');
  return uri[uri.length - 1];
}

export function getBase64URL(base64: string, mimeType: string): string {
  return `data:${mimeType};base64,${base64}`;
}

export function getIOSAssetURI(image: LocalImage): LocalImage {
  return image;
}

export function getImageSource(path: string): ImageSourcePropType | undefined {
  if (path) {
    return {
      uri: buildUrl(server.serverUrl, { path: path }),
    };
  }
  return undefined;
}

export function getImageNameByUri(uri: string): string | undefined {
  if (uri) {
    const result: string[] = uri.split('/');
    return result[result.length - 1];
  }
  return undefined;
}

export function getFileName(url: string, includeExtension: boolean): string {
  const matches =
    url &&
    typeof url.match === 'function' &&
    url.match(/\/?([^/.]*)\.?([^/]*)$/);
  if (!matches) {
    return '';
  }

  if (includeExtension && matches.length > 2 && matches[2]) {
    return matches.slice(1).join('.');
  }
  return matches[1];
}

export function checkFile(url?: string): DocumentType {
  if (url) {
    const resultSplit: string[] = url.split('.');
    if (
      resultSplit[resultSplit.length - 1].toLowerCase() === 'png' ||
      resultSplit[resultSplit.length - 1].toLowerCase() === 'jpg' ||
      resultSplit[resultSplit.length - 1].toLowerCase() === 'jpeg' ||
      resultSplit[resultSplit.length - 1].toLowerCase() === 'gif' ||
      resultSplit[resultSplit.length - 1].toLowerCase() === 'bmp' ||
      resultSplit[resultSplit.length - 1].toLowerCase() === 'webp' ||
      resultSplit[resultSplit.length - 1].toLowerCase() === 'heic'
    ) {
      return DocumentType.IMAGE;
    }

    if (resultSplit[resultSplit.length - 1].toLowerCase() === 'pdf') {
      return DocumentType.PDF;
    }
  }
  return DocumentType.OTHER;
}

export function rootNote(str: string | undefined): string[] {
  if (str) {
    return str.split(/['/']/);
  }
  return [];
}
