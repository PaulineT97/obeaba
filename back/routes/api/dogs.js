const router = require("express").Router();
const connection = require("../../database");


router.post("/addDog", async (req, res) => {
  const { idAdher, chiens } = req.body;

  if (!Array.isArray(chiens)) {
    return res.status(400).json({ message: 'La liste des chiens est invalide.' });
  }

  const nouveauxChiens = [];

  for (const c of chiens) {
    const sqlDog = "INSERT INTO chiens (nomChien, naissance, race, idAdher) VALUES (?,?,?,?)";
    const valuesDog = [c.nomChien, c.naissance, c.race, idAdher];

    try {
      const result = await connection.query(sqlDog, valuesDog);

      const nouvellementAjouteId = result.insertId;

      // Utilisez l'identifiant pour récupérer le chien nouvellement ajouté
      const nouveauChien = (await connection.query("SELECT * FROM chiens WHERE idChien = ?", [nouvellementAjouteId]))[0];

      nouveauxChiens.push(nouveauChien);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Erreur lors de l\'ajout des chiens.' });
    }
  }

  let message = { messageGood: "Vos modifications ont bien été prises en compte", nouveauxChiens };
  res.send(message);
});


router.post("/deleteDog", (req, res) => {
  const idChien = req.body.idChien;
  console.log(req.body.idChien);

  const deleteDogSql = "DELETE FROM chiens WHERE idChien = ?";
  connection.query(deleteDogSql, idChien, (err, result) => {
    if (err) throw err;



    let message = { messageGood: "Vos modifications ont bien été prises en compte" }
    res.send(message);
  });
});

router.get("/getActivities", (req, res) => {
  const sql = `SELECT * FROM activites`;
  connection.query(sql, (err, result) => {
    if (err) throw err;
    console.log("activités récupérées");
    console.log(result);
    res.send(JSON.stringify(result));
  });
});

router.post("/addActivity", (req, res) => {
  const idAd = req.body.idAdher;
  console.log(req.body);

  // const deleteDogSql = "DELETE FROM chiens WHERE idChien = ?";
  // connection.query(deleteDogSql, idChien, (err, result) => {
  //   if (err) throw err;



    let message = { messageGood: "Vos modifications ont bien été prises en compte" }
    res.send(message);
  // });
});

module.exports = router;