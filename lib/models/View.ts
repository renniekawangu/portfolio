import mongoose, { Schema, Document } from 'mongoose'

export interface IView extends Document {
  slug: string
  timestamp: Date
  userAgent?: string
  ipAddress?: string
}

const ViewSchema = new Schema(
  {
    slug: {
      type: String,
      required: true,
      index: true
    },
    timestamp: {
      type: Date,
      default: Date.now,
      index: true
    },
    userAgent: String,
    ipAddress: String
  },
  {
    timestamps: true
  }
)

// Create compound index for efficient queries
ViewSchema.index({ slug: 1, timestamp: -1 })

export const View = mongoose.models.View || mongoose.model<IView>('View', ViewSchema)
