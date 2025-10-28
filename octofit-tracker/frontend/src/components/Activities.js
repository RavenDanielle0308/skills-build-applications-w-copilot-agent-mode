import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const data = await apiService.getActivities();
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