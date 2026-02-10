import { Task, TaskStatus } from '../api/tasks';
import './TaskCard.css';

interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
  onUpdateStatus: (id: string, status: TaskStatus) => void;
  onEdit: (task: Task) => void;
}

const TaskCard = ({
  task,
  onDelete,
  onUpdateStatus,
  onEdit,
}: TaskCardProps) => {
  const statusDisplayMap = {
    [TaskStatus.OPEN]: 'Open',
    [TaskStatus.IN_PROGRESS]: 'In Progress',
    [TaskStatus.DONE]: 'Done',
  };

  const getStatusClass = (status: TaskStatus): string => {
    switch (status) {
      case TaskStatus.OPEN:
        return 'status-open';
      case TaskStatus.IN_PROGRESS:
        return 'status-in-progress';
      case TaskStatus.DONE:
        return 'status-done';
      default:
        return 'status-default';
    }
  };

  return (
    <div className="task-card">
      <div className="task-card-content">
        <div className="task-header">
          <h3 className="task-title">{task.title}</h3>
          <button
            onClick={() => onEdit(task)}
            className="task-edit-btn"
            title="Edit task"
            aria-label="Edit task"
          >
            ✏️
          </button>
        </div>
        <p>{task.description}</p>
      </div>
      <div className="task-card-footer">
        <div className="task-status-wrapper">
          <label htmlFor={`status-${task.id}`} className="task-status-label">
            Status:
          </label>
          <select
            id={`status-${task.id}`}
            value={task.status}
            onChange={(e) =>
              onUpdateStatus(task.id, e.target.value as TaskStatus)
            }
            className={`task-status-select ${getStatusClass(task.status)}`}
          >
            <option value={TaskStatus.OPEN} className="task-status-option">
              {statusDisplayMap[TaskStatus.OPEN]}
            </option>
            <option
              value={TaskStatus.IN_PROGRESS}
              className="task-status-option"
            >
              {statusDisplayMap[TaskStatus.IN_PROGRESS]}
            </option>
            <option value={TaskStatus.DONE} className="task-status-option">
              {statusDisplayMap[TaskStatus.DONE]}
            </option>
          </select>
        </div>
        <button
          className="btn btn-danger task-delete-btn"
          onClick={() => onDelete(task.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
