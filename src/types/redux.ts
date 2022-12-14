import type { Effect } from 'redux-saga/effects';

import type { RootState } from '../store';

export type SagaReturn<R = void, Y = unknown> = Generator<Effect, R, Y>;

export type Selector<R, P extends (string | number)[] = []> = (state: RootState, ...args: P) => R;

export interface ErrorObject {
  message: string;
  status?: number;
  code?: string;
}
