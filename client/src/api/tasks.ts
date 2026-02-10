import axios from './axios';

export enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}

export interface CreateTaskDto {
  title: string;
  description: string;
}

export interface GetTasksFilterDto {
  status?: TaskStatus;
  search?: string;
}

export interface UpdateTaskStatusDto {
  status: TaskStatus;
}

export const tasksAPI = {
  async getTasks(filters?: GetTasksFilterDto): Promise<Task[]> {
    const params = new URLSearchParams();
    if (filters?.status) params.append('status', filters.status);
    if (filters?.search) params.append('search', filters.search);

    const response = await axios.get<Task[]>(`/tasks?${params.toString()}`);
    return response.data;
  },

  getTaskById: async (id: string): Promise<Task> => {
    const response = await axios.get<Task>(`/tasks/${id}`);
    return response.data;
  },

  createTask: async (taskDto: CreateTaskDto): Promise<Task> => {
    const response = await axios.post<Task>('/tasks', taskDto);
    return response.data;
  },

  deleteTask: async (id: string): Promise<void> => {
    await axios.delete(`/tasks/${id}`);
  },

  updateTaskStatus: async (id: string, status: TaskStatus): Promise<Task> => {
    const response = await axios.patch<Task>(`/tasks/${id}/status`, { status });
    return response.data;
  },

  editTask: async (id: string, taskDto: CreateTaskDto): Promise<Task> => {
    const response = await axios.patch<Task>(`/tasks/${id}/edit`, taskDto);
    return response.data;
  },
};
