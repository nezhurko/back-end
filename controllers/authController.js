import Users from '../models/User.js';

import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


export const userAuthRegister = async (req, res) => {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({ error: 'Required fields are missing.' });
      }

      if(await Users.findOne({ username: username })){
        return res.status(401).json({ error: 'User already exist' });
      }

      const _id = (await Users.countDocuments({}) === 0) ?  1 : ((await Users.findOne({}, {}, { sort: { '_id': -1 } }).exec())._id + 1);

      console.log({
        username, password
      }); //!!!!!!
      const hashedPassword = await bcrypt.hash(password,10);

      const user = {
        _id: _id,
        username: username,
        password: hashedPassword,
        createdAt: Date.now()
      };

      await Users.create(user);

      return res.status(201).json({ message: 'User registered successfully'});
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
};
  
export const userAuthLogin = async (req, res) => {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({ error: 'Required fields are missing.' });
      }

      const user = await Users.findOne({username: username});

      if(!user) return res.status(401).json({ error: `User doesn't exist` });

      if(!(await bcrypt.compare(password, user.password))) return res.status(401).json({ error: 'Authentication failed' });

      const jwtToken = jwt.sign({_id: user._id}, process.env.JWT_SECRET, { expiresIn: '1h' });

      return res.status(200).json({jwtToken});
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
};