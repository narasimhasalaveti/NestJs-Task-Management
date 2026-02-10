import { useState, useEffect } from 'react';
import { CreateTaskDto } from '../api/tasks';
import './TaskForm.css';

interface TaskFormProps {
  onSubmit: (task: CreateTaskDto) => Promise<void>;
  onCancel: () => void;
  initialData?: CreateTaskDto;
  isEditMode?: boolean;
}

const TaskForm = ({
  onSubmit,
  onCancel,
  initialData,
  isEditMode = false,
}: TaskFormProps) => {
  const [task, setTask] = useState<CreateTaskDto>(
    initialData || {
      title: '',
      description: '',
    }
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialData) {
      setTask(initialData);
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await onSubmit(task);
      setTask({ title: '', description: '' });
    } catch (err: unknown) {
      const error = err as { message?: string };
      setError(error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="task-form">
      <h3>{isEditMode ? 'Edit Task' : 'Create New Task'}</h3>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={task.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={task.description}
            onChange={handleChange}
            required
            rows={4}
            className="task-form-textarea"
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading
              ? isEditMode
                ? 'Updating...'
                : 'Creating...'
              : isEditMode
                ? 'Update Task'
                : 'Create Task'}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
