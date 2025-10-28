import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await apiService.getUsers();
        setUsers(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load users');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div>Loading users...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="users-container">
      <h2>Users</h2>
      <div className="list-group">
        {users.map((user) => (
          <div key={user.id} className="list-group-item">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h5 className="mb-1">{user.username}</h5>
                <p className="mb-1">{user.email}</p>
              </div>
              <span className="badge bg-primary rounded-pill">
                {user.total_activities || 0} activities
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;