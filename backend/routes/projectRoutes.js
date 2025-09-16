const express = require('express');
const router = express.Router();
const {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
  addProjectMember,
} = require('../controllers/projectController');
const { protect } = require('../middleware/authMiddleware');

// All of these routes are protected and require a logged-in user
router.route('/').post(protect, createProject).get(protect, getProjects);

router.route('/:id').get(protect, getProjectById);

router.route('/:id/members').post(protect, addProjectMember);

router
  .route('/:id')
  .put(protect, updateProject)
  .delete(protect, deleteProject);

module.exports = router;