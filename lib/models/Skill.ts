import mongoose, { Schema, Document } from 'mongoose'

export interface ISkill extends Document {
  id?: number
  name: string
  category: string
  proficiency: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'
  createdAt?: Date
  updatedAt?: Date
}

const SkillSchema = new Schema(
  {
    id: Number,
    name: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    proficiency: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
      default: 'Intermediate'
    }
  },
  {
    timestamps: true
  }
)

export const Skill = mongoose.models.Skill || mongoose.model<ISkill>('Skill', SkillSchema)
