import React, { useState, useEffect } from 'react';
import UserForm from './components/UserForm';
import UserTable from './components/UserTable';
import { userService } from './services/userService';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const userData = await userService.getAllUsers();
      setUsers(userData);
    } catch (error) {
      setMessage({ text: 'Failed to load users', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleUserSubmit = async (userData) => {
    try {
      const newUser = await userService.createUser(userData);
      setUsers(prevUsers => [newUser, ...prevUsers]);
      setMessage({ text: 'User added successfully!', type: 'success' });
      
      // Clear message after 3 seconds
      setTimeout(() => setMessage({ text: '', type: '' }), 3000);
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Failed to add user';
      setMessage({ text: errorMessage, type: 'error' });
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await userService.deleteUser(userId);
        setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
        setMessage({ text: 'User deleted successfully!', type: 'success' });
        
        // Clear message after 3 seconds
        setTimeout(() => setMessage({ text: '', type: '' }), 3000);
      } catch (error) {
        setMessage({ text: 'Failed to delete user', type: 'error' });
      }
    }
  };

  return (
    <div className="App">
      <header className="header">
        <div className="container">
          <h1>Employee Management System</h1>
          <p>Full-Stack React Application with Docker</p>
        </div>
      </header>

      <div className="container">
        {/* Statistics */}
        <div className="stats">
          <div className="stat-card">
            <h3>{users.length}</h3>
            <p>Total Users</p>
          </div>
          <div className="stat-card">
            <h3>{new Set(users.map(user => user.country)).size}</h3>
            <p>Countries</p>
          </div>
          <div className="stat-card">
            <h3>{new Set(users.map(user => user.city)).size}</h3>
            <p>Cities</p>
          </div>
        </div>

        {/* Message Display */}
        {message.text && (
          <div className={message.type === 'success' ? 'success-message' : 'error-alert'}>
            {message.text}
          </div>
        )}

        {/* User Form */}
        <UserForm onSubmit={handleUserSubmit} />

        {/* User Table */}
        <UserTable 
          users={users} 
          loading={loading} 
          onDelete={handleDeleteUser}
        />
      </div>
    </div>
  );
}

export default App;