import React from 'react';

const TaskCard = ({ task, onEdit }) => {
  return (
    <div style={{ border: '1px solid #eee', padding: '10px', margin: '5px', background: '#f9f9f9' }}>
      <h4>{task.title}</h4>
      <p>{task.description}</p>
      <button onClick={() => onEdit(task)}>Edit</button>
    </div>
  );
};

export default TaskCard;