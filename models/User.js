import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
  _id: Number,
  username: String,

  createdAt: { type: Date, default: Date.now },
}, {
  collection: 'users',
  versionKey: false
});

const Users = mongoose.model('Users', userSchema);

export default Users;