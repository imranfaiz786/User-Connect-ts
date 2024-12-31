import { Schema, model, Document } from 'mongoose';

// Interface for User Connection
export interface IConnect extends Document {
  name: string;
  email: string;
  phoneNumber: string;
  qrCode: string;
  link: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Schema for User Connection with validation and optional fields
const ConnectSchema = new Schema<IConnect>(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: (v: string) =>
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v),
        message: (props: { value: string }) =>
          `${props.value} is not a valid email!`,
      },
    },
    phoneNumber: {
      type: String,
      required: true,
      validate: {
        validator: (v: string) => /^[0-9]{10}$/.test(v), // Example: valid 10-digit phone number
        message: (props: { value: string }) =>
          `${props.value} is not a valid phone number!`,
      },
    },
    qrCode: { type: String, required: true }, // Required if QR code is necessary
    link: { type: String, required: true },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

// Indexes for better performance on frequently queried fields
ConnectSchema.index({ email: 1 });
ConnectSchema.index({ phoneNumber: 1 });

// Model for User Connect
const Connect = model<IConnect>('Connect', ConnectSchema);

export default Connect;
