import { useState, useEffect } from 'react';
import { teamService } from '../services/api.js';
import '../styles/team.css';

export const TeamMembers = ({ projectId }) => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTeamMembers();
  }, [projectId]);

  const fetchTeamMembers = async () => {
    try {
      const response = await teamService.getTeamMembers(projectId);
      setMembers(response.data.teamMembers || []);
    } catch (err) {
      setError('Failed to load team members');
    } finally {
      setLoading(false);
    }
  };

  const removeMember = async (memberId) => {
    try {
      await teamService.removeTeamMember(projectId, memberId);
      fetchTeamMembers();
    } catch (err) {
      setError('Failed to remove member');
    }
  };

  if (loading) return <div>Loading team members...</div>;

  return (
    <div className="team-container">
      <h3>Team Members</h3>
      {error && <div className="error">{error}</div>}
      {members.length === 0 ? (
        <p>No team members yet</p>
      ) : (
        <div className="members-list">
          {members.map((member) => {
            const user = member.user || {};
            return (
              <div key={member._id || user._id} className="member-card">
                <div className="member-info">
                  <p>
                    <strong>
                      {user.firstName || user.username} {user.lastName || ''}
                    </strong>
                  </p>
                  <p>{user.email}</p>
                  <span className="role">{member.role}</span>
                </div>
                <button onClick={() => removeMember(user._id)}>Remove</button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export const AddTeamMember = ({ projectId, onMemberAdded }) => {
  const [formData, setFormData] = useState({
    userIdentifier: '',
    role: 'member',
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
      await teamService.addTeamMember(projectId, {
        userIdentifier: formData.userIdentifier,
        role: formData.role,
      });
      setFormData({ userIdentifier: '', role: 'member' });
      onMemberAdded();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add team member');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-member-box">
      <h3>Add Team Member</h3>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="userIdentifier"
          placeholder="Email or Username"
          value={formData.userIdentifier}
          onChange={handleChange}
          required
        />
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="member">Member</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Member'}
        </button>
      </form>
    </div>
  );
};
