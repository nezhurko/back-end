export const healthCheckStatus= async (req,res) => {
    try {
        return res.sendStatus(200);
    } catch(error){
        return res.status(500).json({error: "Something went wrong."});
    }
}