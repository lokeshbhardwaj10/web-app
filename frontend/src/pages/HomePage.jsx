import { useState, useEffect } from 'react';
import { Dashboard } from '../components/Dashboard.jsx';
import { ProjectList } from '../components/Projects.jsx';
import { ProjectPage } from './ProjectsPage.jsx';
import '../styles/home.css';

export const HomePage = () => {
  const [view, setView] = useState('dashboard'); // dashboard, projects, project
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  const handleViewChange = (newView) => {
    setView(newView);
    setSelectedProjectId(null);
  };

  if (view === 'project' && selectedProjectId) {
    return (
      <ProjectPage
        projectId={selectedProjectId}
        onBack={() => handleViewChange('projects')}
      />
    );
  }

  return (
    <div className="home-page">
      <nav className="main-nav">
        <h1>Task Manager</h1>
        <div className="nav-buttons">
          <button
            className={view === 'dashboard' ? 'active' : ''}
            onClick={() => handleViewChange('dashboard')}
          >
            Dashboard
          </button>
          <button
            className={view === 'projects' ? 'active' : ''}
            onClick={() => handleViewChange('projects')}
          >
            Projects
          </button>
        </div>
      </nav>

      <main className="main-content">
        {view === 'dashboard' && <Dashboard />}
        {view === 'projects' && (
          <ProjectList onSelectProject={(id) => {
            setSelectedProjectId(id);
            setView('project');
          }} />
        )}
      </main>
    </div>
  );
};
