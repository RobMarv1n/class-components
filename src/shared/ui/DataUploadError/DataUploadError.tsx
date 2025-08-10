import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type { SerializedError } from 'vitest';
import { getErrorMessage } from './getErrorMessage';

function DataUploadError({ error }: DataUploadErrorProps) {
  const message = getErrorMessage(error);

  return (
    <div className="text-red-500 p-3 flex flex-col justify-center items-center">
      <h2 className="text-red-600 text-2xl font-bold mb-4">
        Data upload error
      </h2>
      <p>{message}</p>
    </div>
  );
}

export type DataUploadErrorProps = {
  error?:
    | FetchBaseQueryError
    | SerializedError
    | Error
    | string
    | object
    | null;
};

export default DataUploadError;
