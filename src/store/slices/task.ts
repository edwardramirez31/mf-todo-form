import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface DjangoTask {
  text: string;
  completed: boolean;
  id: number;
}

export interface Task {
  text: string;
  completed: boolean;
  id: number;
  isUpdating: boolean;
}

interface InitialState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

export const initialState: InitialState = {
  tasks: [],
  loading: false,
  error: null,
};

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    addTask: (state, _action: PayloadAction<{ text: string; completed: boolean }>) => {
      state.loading = true;
    },
    addTaskSuccess: (state, action: PayloadAction<DjangoTask>) => {
      // { id: 1, text: "Hello", completed: false }
      state.tasks = [...state.tasks, { ...action.payload, isUpdating: false }];
      state.loading = false;
    },
    addTaskError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { addTask, addTaskSuccess, addTaskError } = taskSlice.actions;

export default taskSlice.reducer;
