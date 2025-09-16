import React from 'react';

const TaskCard = ({ task, onEdit }) => {
  return (
    <div className="bg-gray-700 rounded-md p-3 shadow-sm">
      <div className="flex justify-between items-start">
        <h4 className="font-medium text-white">{task.title}</h4>
        <button onClick={() => onEdit(task)} className="text-xs text-gray-400 hover:text-white">Edit</button>
      </div>
      <p className="text-sm text-gray-300 mt-1">{task.description}</p>
    </div>
  );
};

export default TaskCard;

// import React from 'react';

// const TaskCard = ({ task, onEdit }) => {
//   return (
//     <div style={{ border: '1px solid #eee', padding: '10px', margin: '5px', background: '#f9f9f9' }}>
//       <h4>{task.title}</h4>
//       <p>{task.description}</p>
//       <button onClick={() => onEdit(task)}>Edit</button>
//     </div>
//   );
// };

// export default TaskCard;