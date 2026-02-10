import { Task, TaskStatus } from '../api/tasks';

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

  const getStatusColor = (status: TaskStatus): string => {
    switch (status) {
      case TaskStatus.OPEN:
        return '#3b82f6';
      case TaskStatus.IN_PROGRESS:
        return '#f59e0b';
      case TaskStatus.DONE:
        return '#10b981';
      default:
        return '#6b7280';
    }
  };

  return (
    <div className="task-card">
      <div className="task-card-content">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'start',
          }}
        >
          <h3 style={{ flex: 1 }}>{task.title}</h3>
          <button
            onClick={() => onEdit(task)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px 8px',
              fontSize: '18px',
              color: '#007bff',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#0056b3')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#007bff')}
            title="Edit task"
          >
            ✏️
          </button>
        </div>
        <p>{task.description}</p>
      </div>
      <div className="task-card-footer">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '12px',
          }}
        >
          <label
            htmlFor={`status-${task.id}`}
            style={{ fontSize: '14px', fontWeight: '500' }}
          >
            Status:
          </label>
          <select
            id={`status-${task.id}`}
            value={task.status}
            onChange={(e) =>
              onUpdateStatus(task.id, e.target.value as TaskStatus)
            }
            style={{
              flex: 1,
              padding: '6px 10px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              backgroundColor: getStatusColor(task.status),
              color: 'white',
              fontWeight: '500',
              cursor: 'pointer',
            }}
          >
            <option
              value={TaskStatus.OPEN}
              style={{ backgroundColor: 'white', color: '#333' }}
            >
              {statusDisplayMap[TaskStatus.OPEN]}
            </option>
            <option
              value={TaskStatus.IN_PROGRESS}
              style={{ backgroundColor: 'white', color: '#333' }}
            >
              {statusDisplayMap[TaskStatus.IN_PROGRESS]}
            </option>
            <option
              value={TaskStatus.DONE}
              style={{ backgroundColor: 'white', color: '#333' }}
            >
              {statusDisplayMap[TaskStatus.DONE]}
            </option>
          </select>
        </div>
        <button
          className="btn btn-danger"
          onClick={() => onDelete(task.id)}
          style={{ width: '100%' }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
