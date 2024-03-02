const router = require("express").Router();
const {Rate, User} = require('../../db/models');

router.get("/rates", async (req,res)=>{
    try {
        const topRate = await Rate.findAll({ order: [["total", "DESC"]], include: [{model: User}]});

        if (topRate) {
            res.status(200).json(topRate);
        }
        res.status(401).json({ message: "No rating" });
    }
    catch (error) {
        console.error("Error during signin:", error);
    }
})

router.post("/rates", async (req,res)=>{
    try {
        await Rate.create({user_id: req.session.userId, total: req.body.userTotal});
        res.status(200).json({ message: "Create" });
    }
    catch (error) {
        console.error("Error during signin:", error);
    }
})

module.exports = router;