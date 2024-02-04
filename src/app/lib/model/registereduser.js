import mongoose from 'mongoose';
const { Schema } = mongoose;
const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

export const RegisteredUser =
  mongoose.models.registeredUser || mongoose.model('registeredUser', userSchema);
