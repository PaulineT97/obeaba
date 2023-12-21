const router = require("express").Router();
const connection = require("../../database");

router.get("/getCertifications", (req, res) => {
    try {
        const sqlSelect = "SELECT * FROM certification";
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

router.post("/updateCertification", (req, res) => {
    const idEduc = req.body.idEduc;
    const certification = req.body.certification;
    console.log(`received request to update educator ${idEduc} with certification ${certification}`);

    const updateSql = `UPDATE possede SET idCertification = ? WHERE idEduc = ${idEduc}`;
    const values = certification;
    connection.query(updateSql, values, async (err, result) => {
        if (err) throw err;
        let resultBack = req.body;
        let message = { messageGood: "La certification a bien été modifiée" }
        res.send(message)
    })
})

router.post("/addEducator", async (req, res) => {
    console.log("test");
    // const { nom, certification, introduction, photo } = req.body;

    // console.log(req.body);
    // Démarrer une transaction pour garantir la cohérence des données
    // try {
    //     // Insérer l'éducateur
    //     const sqlEducateur = "INSERT INTO educateurs (nom, introduction, photo) VALUES (?,?,?)";
    //     const valuesEducateur = [nom, introduction, photo];

    //     connection.query(sqlEducateur, valuesEducateur, (err, result) => {
    //         if (err) throw err;
    //         let resultBack = req.body;
    //         resultBack.id = result.insertId;

    //         const nouvellementAjouteIdEducateur = result.insertId;
    //         console.log("Resultat de l'éducateur:", result);
    //         console.log("Nouvel ID de l'éducateur:", nouvellementAjouteIdEducateur);

    //     // Insérer la certification en utilisant l'identifiant de l'éducateur
    //     const sqlCertification = "INSERT INTO possede (idCertification, idEduc) VALUES (?,?)";
    //     const valuesCertification = [certification, nouvellementAjouteIdEducateur];

    //     connection.query(sqlCertification, valuesCertification);

    //     // Utiliser l'identifiant pour récupérer l'éducateur nouvellement ajouté
    //     const nouveauEducateur = (connection.query("SELECT * FROM educateurs WHERE idEduc = ?", [nouvellementAjouteIdEducateur]))[0];

    //     let message = { messageGood: "L'éducateur a bien été ajouté", nouveauEducateur };
    //     res.json(message);
    //     });

    // } catch (err) {
    //     console.error(err);
    //     return res.status(500).json({ message: "Erreur lors de l'ajout de l'éducateur et de sa certification." });
    // }
});

router.delete('/deleteEducateur/:educateurId', async (req, res) => {
    const educateurId = req.params.educateurId;

    try {
        // Effectuez la logique de suppression dans votre base de données
        // Assurez-vous de traiter les erreurs correctement

        // Exemple :
        // const result = await EducateurModel.deleteOne({ _id: educateurId });

        // Ensuite, envoyez une réponse appropriée
        res.status(200).json({ message: 'L\'éducateur a été supprimé avec succès.' });
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'éducateur:', error);
        res.status(500).json({ message: 'Erreur lors de la suppression de l\'éducateur.' });
    }
});


module.exports = router;