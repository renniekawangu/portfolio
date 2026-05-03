import mongoose, { Schema, Document } from 'mongoose'

export interface IService extends Document {
  id?: number
  name: string
  description: string
  icon?: string
  pricing?: string
  createdAt?: Date
  updatedAt?: Date
}

const ServiceSchema = new Schema(
  {
    id: Number,
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    icon: String,
    pricing: String
  },
  {
    timestamps: true
  }
)

export const Service = mongoose.models.Service || mongoose.model<IService>('Service', ServiceSchema)
