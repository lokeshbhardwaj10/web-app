import { useState, useEffect } from 'react';
import { dashboardService } from '../services/api.js';
import '../styles/dashboard.css';

export const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await dashboardService.getDashboard();
      setDashboardData(response.data);
    } catch (err) {
      setError('Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="dashboard">Loading dashboard...</div>;
  if (error) return <div className="dashboard error">{error}</div>;
  if (!dashboardData) return <div className="dashboard">No data available</div>;

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>

      <div className="stats-grid">
        <div className="stat-card">
          <h4>Total Tasks</h4>
          <p className="stat-number">{dashboardData.stats.total}</p>
        </div>
        <div className="stat-card">
          <h4>To Do</h4>
          <p className="stat-number">{dashboardData.stats.todo}</p>
        </div>
        <div className="stat-card">
          <h4>In Progress</h4>
          <p className="stat-number">{dashboardData.stats.inProgress}</p>
        </div>
        <div className="stat-card">
          <h4>Done</h4>
          <p className="stat-number">{dashboardData.stats.done}</p>
        </div>
        <div className="stat-card overdue">
          <h4>Overdue</h4>
          <p className="stat-number">{dashboardData.stats.overdue}</p>
        </div>
      </div>

      {dashboardData.overdueTasks.length > 0 && (
        <div className="overdue-section">
          <h3>Overdue Tasks</h3>
          <div className="tasks-list">
            {dashboardData.overdueTasks.map((task) => (
              <div key={task.id} className="overdue-task">
                <h4>{task.title}</h4>
                <p>Project: {task.project_name}</p>
                <small>Due: {new Date(task.due_date).toLocaleDateString()}</small>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="projects-section">
        <h3>Your Projects ({dashboardData.projects.length})</h3>
        <div className="projects-list">
          {dashboardData.projects.map((project) => (
            <div key={project.id} className="project-summary">
              <h4>{project.name}</h4>
              <small>Created: {new Date(project.created_at).toLocaleDateString()}</small>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
