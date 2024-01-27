import mongoose from 'mongoose';
const userModel = new mongoose.Schema({
  name: String,
  surname: String,
  email: String,
});
export const NextProduct =
  mongoose.models.nextProducts || mongoose.model('nextProducts', userModel);
