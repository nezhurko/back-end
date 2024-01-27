export const healthCheckStatus= async (req,res) => {
    try {
        return res.sendStatus(200);
    } catch(error){
        console.log(error);
        return res.status(500).json("Something went wrong.");
    }
}