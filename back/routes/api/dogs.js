const router = require("express").Router();
const connection = require("../../database");

//NOTE - récupérer toutes les compétences pour le select dynamique dans le register
router.get("/getActivities", (req, res) => {
    const sql = `SELECT * FROM activites`;
    connection.query(sql, (err, result) => {
      if (err) throw err;
      console.log("activités récupérées");
      console.log(result);
      res.send(JSON.stringify(result));
    });
  });

  module.exports = router;