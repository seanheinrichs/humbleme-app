const express = require("express");
const router = express.Router();

let insults = require("../dummyDatabase");

router.get("/list", async (req, res) => {
    try {
        res.status(200).json({
            data: insults
        });
    } catch (err) {
        res.status(400).json({
            message: "Some error occured",
            err
        });
    }
});

router.get("/:id", async (req, res) => {
    let { id } = req.params;
    id = Number(id);
    try {
        let insult = insults.find(insult => insult._id === id);
        res.status(200).json({
            data: insult
        });
    } catch (err) {
        res.status(400).json({
            message: "Some error occured",
            err
        });
    }
})

module.exports = router;