import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const apiUrl = process.env.NODE_ENV === 'production'
          ? `https://${process.env.CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
          : 'http://localhost:8000/api/workouts/';
        const response = await fetch(apiUrl);
        const data = await response.json();
        setWorkouts(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load workouts');
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  if (loading) return <div>Loading workouts...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="workouts-container">
      <h2>Workouts</h2>
      <div className="row">
        {workouts.map((workout) => (
          <div key={workout.id} className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{workout.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{workout.type}</h6>
                <p className="card-text">{workout.description}</p>
                <ul className="list-unstyled">
                  <li>Duration: {workout.duration} minutes</li>
                  <li>Difficulty: {workout.difficulty}</li>
                  <li>Calories: {workout.calories_burned}</li>
                </ul>
                <button className="btn btn-primary">Start Workout</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Workouts;