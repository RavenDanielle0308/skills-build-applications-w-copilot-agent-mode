const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? `https://${process.env.CODESPACE_NAME}-8000.app.github.dev/api`
  : 'http://localhost:8000/api';

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'Network response was not ok');
  }
  return response.json();
};

export const apiService = {
  // Teams
  getTeams: () => 
    fetch(`${API_BASE_URL}/teams/`).then(handleResponse),
  
  // Users
  getUsers: () => 
    fetch(`${API_BASE_URL}/users/`).then(handleResponse),
  
  // Activities
  getActivities: () => 
    fetch(`${API_BASE_URL}/activities/`).then(handleResponse),
  
  // Workouts
  getWorkouts: () => 
    fetch(`${API_BASE_URL}/workouts/`).then(handleResponse),
  
  // Leaderboard
  getLeaderboard: () => 
    fetch(`${API_BASE_URL}/leaderboard/`).then(handleResponse),
};