import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const apiUrl = process.env.NODE_ENV === 'production'
          ? `https://${process.env.CODESPACE_NAME}-8000.app.github.dev/api/activities/`
          : 'http://localhost:8000/api/activities/';
        const response = await fetch(apiUrl);
        const data = await response.json();
        setActivities(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load activities');
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading) return <div>Loading activities...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="activities-container">
      <h2>Activities</h2>
      <div className="list-group">
        {activities.map((activity) => (
          <div key={activity.id} className="list-group-item">
            <h5 className="mb-1">{activity.name}</h5>
            <p className="mb-1">Type: {activity.type}</p>
            <small>Duration: {activity.duration} minutes</small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Activities;