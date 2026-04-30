import mongoose, { Schema, Document } from 'mongoose'

export interface IService extends Document {
  id?: number
  title: string
  description: string
  icon?: string
  createdAt?: Date
  updatedAt?: Date
}

const ServiceSchema = new Schema(
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
    icon: String
  },
  {
    timestamps: true
  }
)

export const Service = mongoose.models.Service || mongoose.model<IService>('Service', ServiceSchema)
