import { body, validationResult } from 'express-validator';
import Project from '../models/Project.js';
import User from '../models/User.js';
import mongoose from 'mongoose';

export const addTeamMember = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { projectId } = req.params;
    const { userIdentifier, role } = req.body; // Changed from userId to userIdentifier
    const requesterId = req.user.userId;

    const project = await Project.findById(projectId);
    if (!project || project.owner.toString() !== requesterId) {
      return res.status(403).json({ message: 'Only project owner can add members' });
    }

    // Find user by email or username
    const user = await User.findOne({
      $or: [
        { email: userIdentifier },
        { username: userIdentifier }
      ]
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found with that email or username' });
    }

    const userId = user._id.toString();

    const existingMember = project.teamMembers.find((member) =>
      member.user.toString() === userId
    );

    if (existingMember) {
      existingMember.role = role || 'member';
    } else {
      project.teamMembers.push({
        user: user._id,
        role: role || 'member',
      });
    }

    await project.save();

    res.status(201).json({
      message: 'Team member added successfully',
      teamMember: existingMember || project.teamMembers[project.teamMembers.length - 1],
    });
  } catch (error) {
    console.error('Add team member error:', error);
    res.status(500).json({ message: 'Error adding team member' });
  }
};

export const getTeamMembers = async (req, res) => {
  try {
    const { projectId } = req.params;
    const project = await Project.findById(projectId).populate('teamMembers.user', 'username email firstName lastName');

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json({ teamMembers: project.teamMembers });
  } catch (error) {
    console.error('Get team members error:', error);
    res.status(500).json({ message: 'Error fetching team members' });
  }
};

export const removeTeamMember = async (req, res) => {
  try {
    const { projectId, memberId } = req.params;
    const requesterId = req.user.userId;

    const project = await Project.findById(projectId);
    if (!project || project.owner.toString() !== requesterId) {
      return res.status(403).json({ message: 'Only project owner can remove members' });
    }

    project.teamMembers = project.teamMembers.filter(
      (member) => member.user.toString() !== memberId
    );
    await project.save();

    res.json({ message: 'Team member removed successfully' });
  } catch (error) {
    console.error('Remove team member error:', error);
    res.status(500).json({ message: 'Error removing team member' });
  }
};

export const validateTeamMember = [
  body('userIdentifier')
    .notEmpty()
    .withMessage('Email or username is required'),
  body('role')
    .optional()
    .isIn(['admin', 'member'])
];
