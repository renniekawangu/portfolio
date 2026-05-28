import mongoose, { Schema, Document } from 'mongoose'

export interface IContactSettings extends Document {
  email: string
  phone?: string
  github?: string
  linkedin?: string
  twitter?: string
  facebook?: string
  instagram?: string
  createdAt?: Date
  updatedAt?: Date
}

const ContactSettingsSchema = new Schema(
  {
    email: {
      type: String,
      required: true
    },
    phone: String,
    github: String,
    linkedin: String,
    twitter: String,
    facebook: String,
    instagram: String
  },
  {
    timestamps: true
  }
)

export const ContactSettings = mongoose.models.ContactSettings || mongoose.model<IContactSettings>('ContactSettings', ContactSettingsSchema)
