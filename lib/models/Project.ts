import mongoose, { Schema, Document } from 'mongoose'

export interface IProject extends Document {
  id?: number
  title: string
  description: string
  technologies: string[]
  link?: string
  github?: string
  image?: string
  createdAt?: Date
  updatedAt?: Date
}

const ProjectSchema = new Schema(
  {
    id: Number,
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    technologies: [String],
    link: String,
    github: String,
    image: String
  },
  {
    timestamps: true
  }
)

export const Project = mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema)
