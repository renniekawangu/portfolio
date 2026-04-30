import mongoose, { Schema, Document } from 'mongoose'

export interface IComment extends Document {
  postSlug: string
  author: string
  email: string
  content: string
  status: 'approved' | 'pending' | 'rejected'
  replies?: IComment[]
  parentCommentId?: string
  createdAt?: Date
  updatedAt?: Date
}

const CommentSchema = new Schema(
  {
    postSlug: {
      type: String,
      required: true,
      index: true
    },
    author: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ['approved', 'pending', 'rejected'],
      default: 'pending'
    },
    parentCommentId: String,
    replies: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
      }
    ]
  },
  {
    timestamps: true
  }
)

// Index for efficient queries
CommentSchema.index({ postSlug: 1, status: 1, createdAt: -1 })

export const Comment = mongoose.models.Comment || mongoose.model<IComment>('Comment', CommentSchema)
