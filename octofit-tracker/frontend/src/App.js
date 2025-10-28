import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { apiService } from './services/api';

function App() {
  const [activities, setActivities] = useState([]);
  const [teams, setTeams] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    // Fetch initial data
    const fetchData = async () => {
      try {
        const [activitiesData, teamsData, leaderboardData] = await Promise.all([
          apiService.getActivities(),
          apiService.getTeams(),
          apiService.getLeaderboard(),
        ]);
        setActivities(activitiesData);
        setTeams(teamsData);
        setLeaderboard(leaderboardData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark">
          <div className="container">
            <a className="navbar-brand" href="/">
              <img src="/images/octofitapp-small.png" alt="OctoFit" className="app-logo" />
              OctoFit Tracker
            </a>
            <button 
              className="navbar-toggler" 
              type="button" 
              data-bs-toggle="collapse" 
              data-bs-target="#navbarNav"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <a className="nav-link" href="/dashboard">Dashboard</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/activities">Activities</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/teams">Teams</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/profile">Profile</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <main className="container py-4">
          <h1>Welcome to OctoFit Tracker</h1>
          <p className="lead">Track your fitness journey with our comprehensive fitness tracking platform.</p>
          
          <div className="row mt-4">
            <div className="col-md-4">
              <h2>Activities</h2>
              <ul className="list-group">
                {activities.map(activity => (
                  <li key={activity.id} className="list-group-item">
                    {activity.name} - {activity.type}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="col-md-4">
              <h2>Teams</h2>
              <ul className="list-group">
                {teams.map(team => (
                  <li key={team.id} className="list-group-item">
                    {team.name} - {team.members?.length || 0} members
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="col-md-4">
              <h2>Leaderboard</h2>
              <ul className="list-group">
                {leaderboard.map(entry => (
                  <li key={entry.id} className="list-group-item">
                    {entry.user} - {entry.points} points
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
