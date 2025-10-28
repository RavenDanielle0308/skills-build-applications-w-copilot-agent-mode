import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const apiUrl = process.env.NODE_ENV === 'production'
          ? `https://${process.env.CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
          : 'http://localhost:8000/api/leaderboard/';
        const response = await fetch(apiUrl);
        const data = await response.json();
        setLeaderboard(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load leaderboard');
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) return <div>Loading leaderboard...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="leaderboard-container">
      <h2>Leaderboard</h2>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Rank</th>
              <th>User</th>
              <th>Points</th>
              <th>Activities</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((entry, index) => (
              <tr key={entry.id}>
                <td>{index + 1}</td>
                <td>{entry.user}</td>
                <td>{entry.points}</td>
                <td>{entry.total_activities}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;