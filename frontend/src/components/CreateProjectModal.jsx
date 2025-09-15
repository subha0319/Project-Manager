import React, { useState } from 'react';
import * as projectService from '../services/projectService';

const CreateProjectModal = ({ isOpen, onClose, onProjectCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newProject = await projectService.createProject({ title, description });
      onProjectCreated(newProject); // Notify parent component
      onClose(); // Close the modal
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('Failed to create project:', error);
    }
  };

  if (!isOpen) return null;

  return (
    // Basic modal styling
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ background: 'white', padding: '20px', borderRadius: '5px', color: 'black' }}>
        <h2>Create New Project</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Title:</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div>
            <label>Description:</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <button type="submit">Create Project</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default CreateProjectModal;