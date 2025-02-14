import { ErrorResponseType } from './error';
import { SuccessResponseType } from './success';

export type ServerActionReturnType<T = unknown> =
  | SuccessResponseType<T>
  | ErrorResponseType;
