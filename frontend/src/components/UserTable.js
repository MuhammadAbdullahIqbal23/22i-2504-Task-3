import React from 'react';

const UserTable = ({ users, loading, onDelete }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="table-container">
        <h2>All Users</h2>
        <div className="loading">Loading users...</div>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="table-container">
        <h2>All Users</h2>
        <div className="loading">No users found. Add some users using the form above.</div>
      </div>
    );
  }

  return (
    <div className="table-container">
      <h2>All Users ({users.length})</h2>
      <div style={{ overflowX: 'auto' }}>
        <table className="users-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>City</th>
              <th>Country</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.city}</td>
                <td>{user.country}</td>
                <td>{formatDate(user.created_at)}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => onDelete(user.id)}
                    style={{ fontSize: '0.875rem', padding: '0.5rem 1rem' }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;