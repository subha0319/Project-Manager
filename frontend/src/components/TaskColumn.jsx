import React from 'react';
import TaskCard from './TaskCard';

const TaskColumn = ({ title, tasks, onEditTask }) => {
  return (
    <div style={{ flex: 1, margin: '0 10px', padding: '10px', background: '#f4f4f4' }}>
      <h3>{title}</h3>
      {tasks.map(task => (
        <TaskCard key={task._id} task={task} onEdit={onEditTask} />
      ))}
    </div>
  );
};

export default TaskColumn;