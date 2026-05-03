import mongoose, { Schema, Document } from 'mongoose'

export interface ISkill extends Document {
  id?: number
  category: string
  skills: string[]
  proficiency: 'beginner' | 'intermediate' | 'advanced' | 'expert'
  createdAt?: Date
  updatedAt?: Date
}

const SkillSchema = new Schema(
  {
    id: Number,
    category: {
      type: String,
      required: true
    },
    skills: [String],
    proficiency: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced', 'expert'],
      default: 'intermediate'
    }
  },
  {
    timestamps: true
  }
)

export const Skill = mongoose.models.Skill || mongoose.model<ISkill>('Skill', SkillSchema)
