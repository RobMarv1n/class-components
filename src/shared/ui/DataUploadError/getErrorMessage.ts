import type { DataUploadErrorProps } from './DataUploadError';

type ErrorMessagesType = (typeof ErrorMessages)[keyof typeof ErrorMessages];

const ErrorMessages = {
  Unknown: 'An unknown error occurred',
  Server: 'A server error occurred',
} as const;

export function getErrorMessage(
  error: DataUploadErrorProps['error']
): ErrorMessagesType | string {
  if (!error) return ErrorMessages.Unknown;

  if (typeof error === 'string') return error;

  if (error instanceof Error) return error.message;

  if ('error' in error) {
    return typeof error.error === 'string'
      ? error.error
      : ErrorMessages.Unknown;
  }

  if ('data' in error && error.data) {
    return typeof error.data === 'object' &&
      'message' in error.data &&
      typeof error.data.message === 'string'
      ? error.data.message
      : ErrorMessages.Server;
  }

  if ('message' in error && typeof error.message === 'string') {
    return error.message;
  }

  if (typeof error === 'object') {
    return 'errorMessage' in error && typeof error.errorMessage === 'string'
      ? error.errorMessage
      : JSON.stringify(error) || ErrorMessages.Unknown;
  }

  return ErrorMessages.Unknown;
}
