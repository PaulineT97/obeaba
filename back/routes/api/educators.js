const router = require("express").Router();
const connection = require("../../database");

router.get("/allEducateurs", (req, res) => {
    try {
        const sqlSelect = "SELECT * FROM educateurs";
        connection.query(sqlSelect, (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json({ error: "Internal Server Error" });
                return;
            } else {
            const data = result;
            console.log(data);
            res.json(data);
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;