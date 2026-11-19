import axios from 'axios';
import { StatusCodes } from 'http-status-codes';

const API_ERRORS = {
  UNAUTHORIZED: { kind: 'unauthorized' },
  TRANSPORT: { kind: 'transport' },
  HTTP: { kind: 'http' },
} as const;

/**
  unauthorized — сервер ответил 401;
  transport — не получили HTTP-ответ (например, потеря сети);
  http — получили другой ошибочный HTTP-статус.
 */
type ApiError =
  | typeof API_ERRORS.UNAUTHORIZED
  | typeof API_ERRORS.TRANSPORT
  | (typeof API_ERRORS.HTTP & { status: number });

const isApiError = (error: unknown): error is ApiError => {
  if (typeof error !== 'object' || error === null || !('kind' in error)) {
    return false;
  }

  switch (error.kind) {
    case API_ERRORS.UNAUTHORIZED.kind:
    case API_ERRORS.TRANSPORT.kind:
      return true;
    case API_ERRORS.HTTP.kind:
      return 'status' in error && typeof error.status === 'number';
    default:
      return false;
  }
};

const getApiError = (error: unknown): ApiError | null => {
  if (!axios.isAxiosError(error)) {
    return null;
  }

  const status = error.response?.status;

  if (status === StatusCodes.UNAUTHORIZED) {
    return API_ERRORS.UNAUTHORIZED;
  }

  if (status === undefined) {
    return API_ERRORS.TRANSPORT;
  }

  return {
    ...API_ERRORS.HTTP,
    status,
  };
};

export type { ApiError };
export { getApiError, isApiError };
