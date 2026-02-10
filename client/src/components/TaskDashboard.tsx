import { useState, useEffect, useRef } from 'react';
import { tasksAPI, Task, TaskStatus, CreateTaskDto } from '../api/tasks';
import TaskCard from './TaskCard';
import TaskForm from './TaskForm';

interface TaskDashboardProps {
  onLogout: () => void;
}

const MIN_SEARCH_LENGTH = 3;

const TaskDashboard = ({ onLogout }: TaskDashboardProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<TaskStatus | ''>('');
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const prevStatusRef = useRef<TaskStatus | ''>(statusFilter);

  useEffect(() => {
    const normalizedSearch = searchTerm.trim();
    const statusChanged = prevStatusRef.current !== statusFilter;
    const shouldFetch =
      normalizedSearch.length === 0 ||
      normalizedSearch.length >= MIN_SEARCH_LENGTH ||
      statusChanged;

    if (!shouldFetch) {
      prevStatusRef.current = statusFilter;
      return;
    }

    const ignoreSearch = normalizedSearch.length < MIN_SEARCH_LENGTH;
    void fetchTasks(ignoreSearch);
    prevStatusRef.current = statusFilter;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, statusFilter]);

  const fetchTasks = async (ignoreSearch = false) => {
    try {
      setLoading(true);
      const normalizedSearch = searchTerm.trim();
      const search =
        !ignoreSearch && normalizedSearch.length >= MIN_SEARCH_LENGTH
          ? normalizedSearch
          : '';
      const filters = {
        search: search || undefined,
        status: statusFilter || undefined,
      };
      const data = await tasksAPI.getTasks(filters);
      setTasks(data);
      setError('');
    } catch (err: unknown) {
      setError('Failed to fetch tasks');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (taskDto: CreateTaskDto) => {
    try {
      if (editingTask) {
        // Edit mode
        const updatedTask = await tasksAPI.editTask(editingTask.id, taskDto);
        setShowForm(false);
        setEditingTask(null);
        // Update the task in local state
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === updatedTask.id ? updatedTask : task
          )
        );
      } else {
        // Create mode
        const newTask = await tasksAPI.createTask(taskDto);
        setShowForm(false);
        setSearchTerm('');
        setStatusFilter('');
        // Add the newly created task to the top of the list
        setTasks((prevTasks) => [newTask, ...prevTasks]);
      }
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      throw new Error(
        error.response?.data?.message ||
          `Failed to ${editingTask ? 'update' : 'create'} task`
      );
    }
  };

  const handleDeleteTask = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await tasksAPI.deleteTask(id);
        // Remove the task from local state without refetching
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
      } catch (err) {
        alert('Failed to delete task');
      }
    }
  };

  const handleUpdateStatus = async (id: string, status: TaskStatus) => {
    try {
      await tasksAPI.updateTaskStatus(id, status);

      // If status filter is active and the new status doesn't match, remove the task
      if (statusFilter && statusFilter !== status) {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
      } else {
        // Update the task in local state without refetching
        setTasks((prevTasks) =>
          prevTasks.map((task) => (task.id === id ? { ...task, status } : task))
        );
      }
    } catch (err) {
      alert('Failed to update task status');
    }
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  return (
    <div>
      <nav className="navbar">
        <h1>Task Management</h1>
        <button onClick={onLogout}>Logout</button>
      </nav>

      <div className="container">
        <div className="tasks-header">
          <h2>My Tasks</h2>
          <button
            className="btn btn-primary"
            onClick={() => {
              setShowForm(!showForm);
              if (!showForm) {
                setEditingTask(null);
              }
            }}
          >
            {showForm ? 'Cancel' : 'Create New Task'}
          </button>
        </div>

        {showForm && (
          <TaskForm
            onSubmit={handleCreateTask}
            onCancel={handleCancelForm}
            initialData={
              editingTask
                ? {
                    title: editingTask.title,
                    description: editingTask.description,
                  }
                : undefined
            }
            isEditMode={!!editingTask}
          />
        )}

        <div className="filters">
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as TaskStatus | '')}
          >
            <option value="">All Status</option>
            <option value={TaskStatus.OPEN}>Open</option>
            <option value={TaskStatus.IN_PROGRESS}>In Progress</option>
            <option value={TaskStatus.DONE}>Done</option>
          </select>
        </div>

        {error && <div className="error-message">{error}</div>}

        {loading ? (
          <div className="loading">Loading tasks...</div>
        ) : tasks.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#666', marginTop: '2rem' }}>
            No tasks found. Create your first task!
          </p>
        ) : (
          <div className="tasks-grid">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onDelete={handleDeleteTask}
                onUpdateStatus={handleUpdateStatus}
                onEdit={handleEditTask}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskDashboard;
