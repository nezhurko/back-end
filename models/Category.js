import mongoose from 'mongoose';

const { Schema } = mongoose;

const categorySchema = new Schema({
  _id: Number,

  name: String,
  isPublic: Boolean,
  owner: Number,
  
  createdAt: { type: Date, default: Date.now },
}, {
  collection: 'categories',
  versionKey: false
});

const Categories = mongoose.model('Categories', categorySchema);

export default Categories;