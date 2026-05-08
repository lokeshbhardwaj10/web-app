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
          <CreateTask
            projectId={projectId}
            onTaskCreated={() => setRefreshTrigger(refreshTrigger + 1)}
          />
          <TaskList projectId={projectId} refreshTrigger={refreshTrigger} />
        </div>
      )}

      {activeTab === 'team' && (
        <div className="tab-content">
          <AddTeamMember
            projectId={projectId}
            onMemberAdded={() => setRefreshTrigger(refreshTrigger + 1)}
          />
          <TeamMembers projectId={projectId} />
        </div>
      )}
    </div>
  );
};

export const ProjectsPage = () => {
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

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
      <CreateProject onProjectCreated={() => setRefreshTrigger(refreshTrigger + 1)} />
      <ProjectList onSelectProject={setSelectedProjectId} />
    </div>
  );
};
