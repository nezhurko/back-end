import Users from '../models/User.js';

export const getUsers = async (req, res) => {
    try {
      const userId = req.params.userId;
  
      if (userId) {
        const user = await Users.findOne({ _id: userId });
  
        if (!user) return res.status(404).json({ error: 'User not found' });
  
        return res.status(200).json(user);
      } else {
        const users = await Users.find();
        return res.status(200).json(users);
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  export const deleteUser = async (req, res) => {
    try {
      const userId = req.params.userId;
  
      await Users.findByIdAndDelete(userId);
  
      const users = await Users.find();
      return res.status(200).json(users);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  /*
  export const createUser = async (req, res) => {
    try {
      const { userName } = req.body;
  
      if (!userName) {
        return res.status(400).json({ error: 'Required fields are missing.' });
      }

      const user = await new Users({
        _id: (await Users.findOne({}, {}, { sort: { '_id': -1 } }).exec())._id + 1,
        username: userName,
      }).save();
  
      return res.status(201).json(user);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  */