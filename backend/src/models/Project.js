import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    description: { type: String, trim: true, maxlength: 1000 },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    teamMembers: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        role: { type: String, enum: ['admin', 'member'], default: 'member' },
      },
    ],
  },
  { timestamps: true }
);

const Project = mongoose.model('Project', projectSchema);
export default Project;
