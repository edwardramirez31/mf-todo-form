/* eslint-disable no-console */
import { taskSubscription } from '@mf-app/utility';
import type { PayloadAction } from '@reduxjs/toolkit';
import { all, put, call, takeEvery } from 'redux-saga/effects';
import type { CallEffect, PutEffect } from 'redux-saga/effects';

import DjangoTodo from '../../api/djangoTodo';
import type { ErrorObject } from '../../types/redux';
import type { DjangoTask } from '../slices/task';
import { addTask, addTaskError, addTaskSuccess } from '../slices/task';

function* addTaskSaga({
  payload: data,
}: PayloadAction<DjangoTask>): Generator<CallEffect | PutEffect, void, DjangoTask> {
  try {
    const newTask = yield call([DjangoTodo, 'createTask'], data);
    yield put(addTaskSuccess(newTask));
    taskSubscription.next(newTask);
  } catch (err) {
    const error = err as ErrorObject;
    yield put(addTaskError(error.message));
  }
}

export default function* tasksSaga(): Generator {
  try {
    yield all([takeEvery(addTask, addTaskSaga)]);
  } catch (error) {
    console.log(error);
  }
}
