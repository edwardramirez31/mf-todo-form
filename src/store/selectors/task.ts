import type { Selector } from '../../types/redux';

export const getTasksLoading: Selector<boolean> = (state): boolean => state.task.loading;

export const getTasksError: Selector<string | null> = (state): string | null => state.task.error;
