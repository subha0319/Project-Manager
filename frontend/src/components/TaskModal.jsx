import React, { useState, useEffect } from 'react';
import * as taskService from '../services/taskService';

const TaskModal = ({ isOpen, onClose, onTaskSaved, projectId, taskToEdit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('ToDo');

  // If we are editing a task, populate the form fields
  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description || '');
      setStatus(taskToEdit.status);
    } else {
      // If creating, reset to default
      setTitle('');
      setDescription('');
      setStatus('ToDo');
    }
  }, [taskToEdit, isOpen]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const taskData = { title, description, status, projectId };
    
    try {
      if (taskToEdit) {
        await taskService.updateTask(taskToEdit._id, taskData);
      } else {
        await taskService.createTask(taskData);
      }
      onTaskSaved(); // Notify parent to refresh tasks
      onClose();
    } catch (error) {
      console.error('Failed to save task', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: 'white', padding: '20px', color: 'black' }}>
        <h2>{taskToEdit ? 'Edit Task' : 'Add New Task'}</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="ToDo">To Do</option>
            <option value="InProgress">In Progress</option>
            <option value="Done">Done</option>
          </select>
          <button type="submit">Save</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;