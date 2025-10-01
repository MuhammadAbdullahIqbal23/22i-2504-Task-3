import React, { useState } from 'react';

const UserForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    city: '',
    country: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
    }

    // City validation
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    } else if (formData.city.trim().length < 2) {
      newErrors.city = 'City must be at least 2 characters';
    }

    // Country validation
    if (!formData.country.trim()) {
      newErrors.country = 'Country is required';
    } else if (formData.country.trim().length < 2) {
      newErrors.country = 'Country must be at least 2 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Trim whitespace from all fields
      const cleanedData = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        city: formData.city.trim(),
        country: formData.country.trim()
      };

      await onSubmit(cleanedData);
      
      // Reset form on successful submission
      setFormData({
        name: '',
        email: '',
        city: '',
        country: ''
      });
      setErrors({});
    } catch (error) {
      // Error handling is done in parent component
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Add New User</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? 'error' : ''}
            placeholder="Enter full name"
            disabled={isSubmitting}
          />
          {errors.name && <div className="error-message">{errors.name}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? 'error' : ''}
            placeholder="Enter email address"
            disabled={isSubmitting}
          />
          {errors.email && <div className="error-message">{errors.email}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="city">City *</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className={errors.city ? 'error' : ''}
            placeholder="Enter city"
            disabled={isSubmitting}
          />
          {errors.city && <div className="error-message">{errors.city}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="country">Country *</label>
          <input
            type="text"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className={errors.country ? 'error' : ''}
            placeholder="Enter country"
            disabled={isSubmitting}
          />
          {errors.country && <div className="error-message">{errors.country}</div>}
        </div>

        <button 
          type="submit" 
          className="btn"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Adding User...' : 'Add User'}
        </button>
      </form>
    </div>
  );
};

export default UserForm;