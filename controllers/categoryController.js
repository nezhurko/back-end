export const getCategories = async (req,res) => {
    try {
        return res.status(200).json(global.categories);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const deleteAllCategories = async (req,res) => {
    try {
        global.categories = [];
        return res.status(200).json(global.categories); 
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const createCategory = async (req,res) => {
    try {
        const { categoryName } = req.body;

        if (!categoryName) {
            return res.status(400).json({ error: 'Required fields are missing.' });
        };

        const id = global.categories.length === 0 ? 1 : Math.max(...categories.map(category => category.id)) + 1;

        global.categories.push({
            id: id,
            name: String(categoryName)
        });

        return res.status(201).json(global.categories.find(category => category.id === id));
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};