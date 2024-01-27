export const getUsers = async (req,res) => {
    try {
        const userId = req.params.userId;

        if(userId){
            console.log(userId);
            const user = global.users.find(user => user.id === Number(userId));

            if(!user) return res.status(404).json({error: "User not found"});

            return res.status(200).json(user);
        }else{
            return res.status(200).json(global.users);
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const deleteUser = async (req,res) => {
    try {
        const userId = req.params.userId;

        global.users = global.users.filter(user => user.id !== Number(userId));

        return res.status(200).json(global.users); 
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const createUser = async (req,res) => {
    try {
        const { userName } = req.body;

        if (!userName) {
            return res.status(400).json({ error: 'Required fields are missing.' });
        };

        const id = users.length === 0 ? 1 : Math.max(...users.map(user => user.id)) + 1;

        global.users.push({
            id: id,
            name: String(userName)
        });

        return res.status(201).json(global.users.find(user => user.id === id));
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};