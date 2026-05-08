import { useState, useEffect } from 'react';
import { ProjectList, CreateProject } from '../components/Projects.jsx';
import { CreateTask, TaskList } from '../components/Tasks.jsx';
import { TeamMembers, AddTeamMember } from '../components/Team.jsx';
import { projectService } from '../services/api.js';
import '../styles/projectpage.css';

export const ProjectPage = ({ projectId, onBack }) => {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('tasks');
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [showTaskForm, setShowTaskForm] = useState(true);
  const [showTeamForm, setShowTeamForm] = useState(true);

  useEffect(() => {
    fetchProject();
  }, [projectId]);

  const fetchProject = async () => {
    try {
      const response = await projectService.getProject(projectId);
      setProject(response.data.project);
    } catch (err) {
      setError('Failed to load project');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="project-page">Loading project...</div>;
  if (error) return <div className="project-page error">{error}</div>;
  if (!project) return <div className="project-page">Project not found</div>;

  return (
    <div className="project-page">
      <div className="project-header">
        <button onClick={onBack} className="back-btn">
          ← Back
        </button>
        <h1>{project.name}</h1>
        <p>{project.description}</p>
      </div>

      <div className="project-tabs">
        <button
          className={activeTab === 'tasks' ? 'active' : ''}
          onClick={() => setActiveTab('tasks')}
        >
          Tasks
        </button>
        <button
          className={activeTab === 'team' ? 'active' : ''}
          onClick={() => setActiveTab('team')}
        >
          Team
        </button>
      </div>

      {activeTab === 'tasks' && (
        <div className="tab-content">
          <div className="section-header">
            <h2>Tasks</h2>
            <button
              className="primary-btn"
              onClick={() => setShowTaskForm((prev) => !prev)}
            >
              {showTaskForm ? 'Hide Task Form' : 'Add Task'}
            </button>
          </div>
          {showTaskForm && (
            <CreateTask
              projectId={projectId}
              onTaskCreated={() => setRefreshTrigger((prev) => prev + 1)}
            />
          )}
          <TaskList projectId={projectId} refreshTrigger={refreshTrigger} />
        </div>
      )}

      {activeTab === 'team' && (
        <div className="tab-content">
          <div className="section-header">
            <h2>Team</h2>
            <button
              className="primary-btn"
              onClick={() => setShowTeamForm((prev) => !prev)}
            >
              {showTeamForm ? 'Hide Member Form' : 'Add Team Member'}
            </button>
          </div>
          {showTeamForm && (
            <AddTeamMember
              projectId={projectId}
              onMemberAdded={() => setRefreshTrigger((prev) => prev + 1)}
            />
          )}
          <TeamMembers projectId={projectId} />
        </div>
      )}
    </div>
  );
};

export const ProjectsPage = ({ onProjectSelected }) => {
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [showCreate, setShowCreate] = useState(false);

  if (selectedProjectId) {
    return (
      <ProjectPage
        projectId={selectedProjectId}
        onBack={() => setSelectedProjectId(null)}
      />
    );
  }

  return (
    <div className="projects-page">
      <div className="project-actions">
        <button onClick={() => setShowCreate(!showCreate)} className="primary-btn">
          {showCreate ? 'Hide Create Project' : 'Add Project'}
        </button>
      </div>
      {showCreate && (
        <CreateProject onProjectCreated={() => {
          setRefreshTrigger((prev) => prev + 1);
          setShowCreate(false);
        }} />
      )}
      <ProjectList onSelectProject={(id) => {
        setSelectedProjectId(id);
        if (onProjectSelected) onProjectSelected(id);
      }} refreshTrigger={refreshTrigger} />
    </div>
  );
};
