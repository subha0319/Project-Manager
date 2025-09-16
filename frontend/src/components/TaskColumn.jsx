import React from 'react';
import TaskCard from './TaskCard';

const TaskColumn = ({ title, tasks, onEditTask }) => {
  return (
    <div className="flex-1 bg-gray-800 rounded-lg p-4 min-h-[300px]">
      <h3 className="text-lg font-semibold mb-4 text-white">{title}</h3>
      <div className="space-y-3">
        {tasks.map(task => (
          <TaskCard key={task._id} task={task} onEdit={onEditTask} />
        ))}
      </div>
    </div>
  );
};

export default TaskColumn;


// import React from 'react';
// import TaskCard from './TaskCard';

// const TaskColumn = ({ title, tasks, onEditTask }) => {
//   return (
//     <div style={{ flex: 1, margin: '0 10px', padding: '10px', background: '#f4f4f4' }}>
//       <h3>{title}</h3>
//       {tasks.map(task => (
//         <TaskCard key={task._id} task={task} onEdit={onEditTask} />
//       ))}
//     </div>
//   );
// };

// export default TaskColumn;