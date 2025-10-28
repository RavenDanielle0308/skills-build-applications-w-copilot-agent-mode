import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const apiUrl = process.env.NODE_ENV === 'production'
          ? `https://${process.env.CODESPACE_NAME}-8000.app.github.dev/api/teams/`
          : 'http://localhost:8000/api/teams/';
        const response = await fetch(apiUrl);
        const data = await response.json();
        setTeams(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load teams');
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  if (loading) return <div>Loading teams...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="teams-container">
      <h2>Teams</h2>
      <div className="row">
        {teams.map((team) => (
          <div key={team.id} className="col-md-6 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{team.name}</h5>
                <p className="card-text">{team.description}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <small className="text-muted">Members: {team.members?.length || 0}</small>
                  <button className="btn btn-primary btn-sm">Join Team</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Teams;