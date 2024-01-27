import mongoose from 'mongoose';

const { Schema } = mongoose;

const recordSchema = new Schema({
  _id: Number,

  owner: Number,
  category: Number,
  amount: Number,

  createdAt: { type: Date, default: Date.now },
}, {
  collection: 'records',
  versionKey: false
});

const Records = mongoose.model('Records', recordSchema);

export default Records;