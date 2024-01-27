import Records from "../models/Record.js";

export const getRecords = async (req, res) => {
  try {
    const recordId = req.params.recordId;
    const { userId, categoryId } = req.query;

    let query = {};

    if (recordId) {
      query = { ...query, _id: recordId };
    }

    if (userId) {
      query = { ...query, owner: userId };
    }

    if (categoryId) {
      query = { ...query, category: categoryId };
    }

    const filteredRecords = await Records.find(query);

    return res.status(200).json(filteredRecords);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deleteRecord = async (req, res) => {
  try {
    const recordId = req.params.recordId;

    await Records.findByIdAndDelete(recordId);

    const updatedRecords = await Records.find();

    return res.status(200).json(updatedRecords);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const createRecord = async (req, res) => {
  try {
    const { userId, categoryId, spentAmount } = req.body;

    if (!userId || !categoryId || !spentAmount) {
      return res.status(400).json({ error: 'Required fields are missing.' });
    }

    const record = await new Records({
      _id: (await Records.findOne({}, {}, { sort: { '_id': -1 } }).exec())._id + 1,

      owner: userId,
      category: categoryId,
      amount: spentAmount,
    }).save();

    return res.status(201).json(record);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};