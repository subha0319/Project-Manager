const Project = require('../models/Project');

// @desc    Create a new project
// @route   POST /api/projects
const createProject = async (req, res) => {
  const { title, description, deadline } = req.body;

  if (!title) {
    return res.status(400).json({ message: 'Title is required' });
  }

  try {
    const project = await Project.create({
      title,
      description,
      deadline,
      owner: req.user._id, // The owner is the currently logged-in user
    });
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: 'Server error while creating project' });
  }
};

// @desc    Get all projects for a user (owned or member of)
// @route   GET /api/projects
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      // Find projects where the user is either the owner or in the members array
      $or: [{ owner: req.user._id }, { members: req.user._id }],
    }).populate('owner', 'name email'); // Populate owner details
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Server error while fetching projects' });
  }
};

// @desc    Update a project
// @route   PUT /api/projects/:id
const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // --- Permission Check ---
    // Check if the logged-in user is the owner of the project
    if (project.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'User not authorized to update this project' });
    }

    project.title = req.body.title || project.title;
    project.description = req.body.description || project.description;
    project.deadline = req.body.deadline || project.deadline;

    const updatedProject = await project.save();
    res.json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: 'Server error while updating project' });
  }
};

// @desc    Delete a project
// @route   DELETE /api/projects/:id
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // --- Permission Check ---
    if (project.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'User not authorized to delete this project' });
    }

    await project.deleteOne();
    res.json({ message: 'Project removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error while deleting project' });
  }
};

// This is a new, separate controller function
// @desc    Get a single project by ID
// @route   GET /api/projects/:id
const getProjectById = async (req, res) => {
    try {
        // Find the project and populate owner and members with their name and email
        const project = await Project.findById(req.params.id)
            .populate('owner', 'name email')
            .populate('members', 'name email'); // <-- Add this line

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        
        // You might add a permission check here too if needed
        res.json(project);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};


module.exports = {
  createProject,
  getProjects,
  updateProject,
  deleteProject,
  getProjectById,
};