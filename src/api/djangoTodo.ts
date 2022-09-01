import axios from 'axios';

import type { DjangoTask } from '../store/slices/task';

const axiosInstance = axios.create({
  baseURL: 'https://edwardramirez.pythonanywhere.com',
});

class DjangoTodo {
  static async createTask(data: DjangoTask): Promise<DjangoTask> {
    const response = await axiosInstance.post<DjangoTask>('/', data);
    return response.data;
  }
}

export default DjangoTodo;
