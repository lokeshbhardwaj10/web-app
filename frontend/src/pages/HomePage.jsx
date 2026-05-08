import { useState } from 'react';
import { Dashboard } from '../components/Dashboard.jsx';
import { ProjectsPage } from './ProjectsPage.jsx';
import '../styles/home.css';

export const HomePage = () => {
  const [view, setView] = useState('dashboard'); // dashboard or projects

  return (
    <div className="home-page">
      <nav className="main-nav">
        <h1>Task Manager</h1>
        <div className="nav-buttons">
          <button
            className={view === 'dashboard' ? 'active' : ''}
            onClick={() => setView('dashboard')}
          >
            Dashboard
          </button>
          <button
            className={view === 'projects' ? 'active' : ''}
            onClick={() => setView('projects')}
          >
            Projects
          </button>
        </div>
      </nav>

      <main className="main-content">
        {view === 'dashboard' && <Dashboard />}
        {view === 'projects' && <ProjectsPage />}
      </main>
    </div>
  );
};
