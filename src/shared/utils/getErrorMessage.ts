import { hasMessage } from './typeguards';

export function getErrorMessage(error: unknown): string {
  if (!error) return 'Unknown error';

  if (typeof error === 'string') return error;

  if (error instanceof Error) return error.message;

  if (hasMessage(error)) return error.message;

  if (typeof error === 'object') return JSON.stringify(error);

  return 'Unknown error';
}
