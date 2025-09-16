const Task = require('../models/Task');
const Project = require('../models/Project');

// @desc    Create a new task for a project
// @route   POST /api/tasks
const createTask = async (req, res) => {
  const { title, description, projectId, assignee, status, priority, dueDate } = req.body;

  if (!title || !projectId) {
    return res.status(400).json({ message: 'Title and Project ID are required' });
  }

  try {
    // 1. Find the project this task belongs to
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // 2. --- Permission Check ---
    //    Check if the user is a member or owner of the project
    const isMember = project.members.some(memberId => memberId.equals(req.user._id));
    const isOwner = project.owner.equals(req.user._id);

    if (!isMember && !isOwner) {
      return res.status(403).json({ message: 'User not authorized to add tasks to this project' });
    }
    
    // 3. Create and save the new task
    const task = await Task.create({
      title,
      description,
      project: projectId,
      assignee,
      status,
      priority,
      dueDate,
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get all tasks for a specific project
// @route   GET /api/tasks/project/:projectId
const getTasksForProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);
    if (!project) {
        return res.status(404).json({ message: 'Project not found' });
    }

    // --- Permission Check ---
    const isMember = project.members.some(memberId => memberId.equals(req.user._id));
    const isOwner = project.owner.equals(req.user._id);

    if (!isMember && !isOwner) {
        return res.status(403).json({ message: 'User not authorized to view these tasks' });
    }

    const tasks = await Task.find({ project: req.params.projectId }).populate('assignee', 'name email');
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update a task
// @route   PUT /api/tasks/:id
const updateTask = async (req, res) => {
  try {
    // Find the original task to perform permission checks
    let task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    // --- Permission Check ---
    const project = await Project.findById(task.project);
    const isOwner = project.owner.equals(req.user._id);
    const isAssignee = task.assignee && task.assignee.equals(req.user._id);

    if (!isOwner && !isAssignee) {
        return res.status(403).json({ message: 'User not authorized to update this task' });
    }

    // Update the task in the database ONCE and get the new version.
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });

    // Emit the real-time event BEFORE sending the response.
    if (req.io) {
        req.io.to(updatedTask.project.toString()).emit('taskUpdated', updatedTask);
    }

    // Send the final, single response back to the original caller.
    res.json(updatedTask);

  } catch (error) {
    // Log the actual error on the server for better debugging
    console.error(error); 
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // --- Permission Check ---
    // Only the project owner can delete tasks
    const project = await Project.findById(task.project);
    if (!project.owner.equals(req.user._id)) {
        return res.status(403).json({ message: 'User not authorized to delete this task' });
    }

    await task.deleteOne();
    res.json({ message: 'Task removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get all tasks for the logged-in user
// @route   GET /api/tasks/mytasks
const getMyTasks = async (req, res) => {
  try {
    // Find all projects where the user is an owner or member
    const projects = await Project.find({
      $or: [{ owner: req.user._id }, { members: req.user._id }],
    }).select('_id'); // We only need the project IDs

    const projectIds = projects.map(p => p._id);

    // Find all tasks that belong to those projects
    const tasks = await Task.find({ project: { $in: projectIds } });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  createTask,
  getTasksForProject,
  updateTask,
  deleteTask,
  getMyTasks,
};