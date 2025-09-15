import React from 'react';
import { Link } from 'react-router-dom';

const ProjectList = ({ projects }) => {
  if (projects.length === 0) {
    return <p>You have no projects yet. Create one to get started!</p>;
  }

  return (
    <div>
      <h2>Your Projects</h2>
      {projects.map((project) => (
        <div key={project._id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
          <h3>
            <Link to={`/project/${project._id}`}>{project.title}</Link>
          </h3>
          <p>{project.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ProjectList;