import { useState, useEffect } from 'react';
import { taskService } from '../services/api.js';
import { useAuth } from '../contexts/AuthContext.jsx';
import '../styles/tasks.css';

export const TaskList = ({ projectId, refreshTrigger }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    fetchTasks();
  }, [projectId, refreshTrigger]);

  const fetchTasks = async () => {
    try {
      const response = await taskService.getTasks(projectId, filter ? { status: filter } : {});
      setTasks(response.data.tasks || []);
    } catch (err) {
      setError('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      await taskService.updateTask(projectId, taskId, { status: newStatus });
      fetchTasks();
    } catch (err) {
      setError('Failed to update task');
    }
  };

  if (loading) return <div>Loading tasks...</div>;

  return (
    <div className="tasks-container">
      <h3>Tasks</h3>
      {error && <div className="error">{error}</div>}

      <div className="filter-controls">
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="">All Tasks</option>
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>

      {tasks.length === 0 ? (
        <p>No tasks found</p>
      ) : (
        <div className="tasks-list">
          {tasks.map((task) => (
            <div key={task.id} className="task-card">
              <div className="task-header">
                <h4>{task.title}</h4>
                <span className={`status ${task.status}`}>{task.status}</span>
              </div>
              <p>{task.description}</p>
              <div className="task-meta">
                <small>Priority: {task.priority}</small>
                {task.assigned_user && <small>Assigned to: {task.assigned_user}</small>}
                {task.due_date && <small>Due: {new Date(task.due_date).toLocaleDateString()}</small>}
              </div>
              <div className="task-actions">
                <select
                  value={task.status}
                  onChange={(e) => updateTaskStatus(task.id, e.target.value)}
                >
                  <option value="todo">To Do</option>
                  <option value="in-progress">In Progress</option>
                  <option value="done">Done</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const CreateTask = ({ projectId, onTaskCreated }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await taskService.createTask(projectId, formData);
      setFormData({ title: '', description: '', priority: 'medium', dueDate: '' });
      onTaskCreated();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-task-box">
      <h3>Create New Task</h3>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Task Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />
        <select name="priority" value={formData.priority} onChange={handleChange}>
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
        <input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Task'}
        </button>
      </form>
    </div>
  );
};
