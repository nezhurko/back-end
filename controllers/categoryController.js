import Categories from "../models/Category.js";
import Users from '../models/User.js';

export const getCategories = async (req, res) => {
    try {
      const categories = await Categories.find();
      return res.status(200).json(categories);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  export const deleteAllCategories = async (req, res) => {
    try {
      await Categories.deleteMany({});
      const categories = await Categories.find();
      return res.status(200).json(categories);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  export const createCategory = async (req, res) => {
    try {
      const { categoryName, isCategoryPublic, categoryOwner } = req.body;
  
      if (!categoryName || (!isCategoryPublic && categoryOwner === undefined)) {
        return res.status(400).json({ error: 'Required fields are missing.' });
      }

      if (!isCategoryPublic && categoryOwner) {
        const user = await Users.findById(categoryOwner);
        if (!user) {
          return res.status(400).json({ error: 'Invalid category owner.' });
        }
      }
      
      const category = await new Categories({
        _id: (await Categories.findOne({}, {}, { sort: { '_id': -1 } }).exec())._id + 1,
        name: categoryName,
        isPublic: isCategoryPublic,
        owner: isCategoryPublic ? undefined : categoryOwner
      }).save();

      return res.status(201).json(category);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };