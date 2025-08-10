import { isObject } from '../../utils/typeguards';
import type { DataUploadErrorProps } from './DataUploadError';

type ErrorMessagesType = (typeof ErrorMessages)[keyof typeof ErrorMessages];

export const ErrorMessages = {
  Unknown: 'An unknown error occurred',
  Server: 'A server error occurred',
} as const;

export function getErrorMessage(
  error: DataUploadErrorProps['error']
): ErrorMessagesType | string {
  if (!error) return ErrorMessages.Unknown;

  if (typeof error === 'string') return error;

  if (error instanceof Error) return error.message;

  if (isObject(error)) {
    if ('error' in error) {
      return typeof error.error === 'string'
        ? error.error
        : ErrorMessages.Unknown;
    }

    if ('data' in error) {
      const data = error.data;
      if (
        isObject(data) &&
        'message' in data &&
        typeof data.message === 'string'
      ) {
        return data.message;
      }
      return ErrorMessages.Server;
    }

    if ('message' in error && typeof error.message === 'string') {
      return error.message;
    }

    if ('errorMessage' in error && typeof error.errorMessage === 'string') {
      return error.errorMessage;
    }

    return JSON.stringify(error) || ErrorMessages.Unknown;
  }

  return ErrorMessages.Unknown;
}
