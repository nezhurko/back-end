export const getRecords = async (req, res) => {
    try {
        const recordId = req.params.recordId;
        const { userId, categoryId } = req.query;

        let filteredRecords = global.records;

        if (recordId) {
            filteredRecords = filteredRecords.filter(record => record.id === parseInt(recordId));
        }

        if (userId) {
            filteredRecords = filteredRecords.filter(record => record.userId === parseInt(userId));
        }

        if (categoryId) {
            filteredRecords = filteredRecords.filter(record => record.categoryId === parseInt(categoryId));
        }

        return res.status(200).json(filteredRecords);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const deleteRecord = async (req,res) => {
    try {
        const recordId = req.params.recordId;

        global.records = global.records.filter(record => record.id !== Number(recordId));

        return res.status(200).json(global.records);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const createRecord = async (req,res) => {
    try {
        const { userId, categoryId, spentAmount } = req.body;

        if (!userId || !categoryId || !spentAmount) {
            return res.status(400).json({ error: 'Required fields are missing.' });
        };

        const id = global.records.length === 0 ? 1 : Math.max(...global.records.map(record => record.id)) + 1;

        global.records.push({
            id: id,
            userId: Number(userId),
            categoryId: Number(categoryId),
            createdAt: Date.now(),
            spentAmount: Number(spentAmount)
        });

        return res.status(201).json(global.records.find(record => record.id === id));
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};