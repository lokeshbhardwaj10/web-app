import Task from '../models/Task.js';
import Project from '../models/Project.js';

export const getDashboard = async (req, res) => {
  try {
    const userId = req.user.userId;

    const projects = await Project.find({
      $or: [{ owner: userId }, { 'teamMembers.user': userId }],
    });

    const projectIds = projects.map((project) => project._id);

    const tasks = await Task.find({ project: { $in: projectIds } })
      .populate('project', 'name')
      .populate('assignedTo', 'username email firstName lastName')
      .sort({ dueDate: 1 });

    const overdueTasks = tasks.filter(
      (task) => task.dueDate && task.dueDate < new Date() && task.status !== 'done'
    );

    const stats = tasks.reduce(
      (acc, task) => {
        acc.total += 1;
        acc[task.status] = (acc[task.status] || 0) + 1;
        return acc;
      },
      { total: 0, todo: 0, 'in-progress': 0, done: 0, overdue: 0 }
    );

    res.json({
      tasks,
      overdueTasks,
      projects,
      stats: {
        total: stats.total,
        todo: stats.todo || 0,
        inProgress: stats['in-progress'] || 0,
        done: stats.done || 0,
        overdue: overdueTasks.length,
      },
    });
  } catch (error) {
    console.error('Get dashboard error:', error);
    res.status(500).json({ message: 'Error fetching dashboard data' });
  }
};
