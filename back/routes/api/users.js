const router = require("express").Router();
const bcrypt = require("bcrypt");
// const jsonwebtoken = require("jsonwebtoken");
// const { key, keyPub } = require("../../keys");

const connection = require("../../database");

//NOTE - récupérer les infos du user lors de sa connexion

// router.get("/userConnected", (req, res) => {
//     const { token } = req.cookies;
//     if (token) {
//         try {
//             const decodedToken = jsonwebtoken.verify(token, keyPub, {
//                 algorithms: "RS256",
//             });
//             const sqlSelect =
//                 "SELECT idUser, name, email FROM users WHERE idUser  =?";
//             connection.query(sqlSelect, [decodedToken.sub], (err, result) => {
//                 if (err) throw err;
//                 const connectedUser = result[0];
//                 connectedUser.password = "";
//                 if (connectedUser) {
//                     console.log(connectedUser);
//                     res.json(connectedUser);
//                 } else {
//                     res.json(null);
//                 }
//             });
//         } catch (error) {
//             console.log(error);
//         }
//     } else {
//         res.json(null);
//     }
// });




router.post("/getAdherents", (req, res) => {
    const { email, motdepasse } = req.body;
    const sql = `SELECT * FROM adherents WHERE email= ? AND motdepasse= ?`;
    connection.query(sql, [email, motdepasse], (err, result) => {
        if (err) throw err;
        console.log(result);
        if (!result.length) {
            let wrong = { message: "compte inexistant" };
            res.send(wrong);
        } else {
            let idAd = result[0].idAdher;
            const sqlData = `SELECT adherents.*, chiens.*, pratiquer.*, activites.nomActivites FROM adherents, chiens, pratiquer, activites WHERE adherents.idAdher= ? AND adherents.idAdher = chiens.idAdher AND chiens.idChien = pratiquer.idChien AND pratiquer.idActivites = activites.idActivites`;
            connection.query(sqlData, [idAd], (err, result) => {
                if (err) throw err;
                console.log(result);
                res.send(JSON.stringify(result));
            })
        }
    });
});


router.post("/register", (req, res) => {
    const { nom, prenom, email, motdepasse, chiens } = req.body;
    const verifyMailSql = `SELECT * FROM adherents WHERE email="${email}"`;
    connection.query(verifyMailSql, [email], async (err, result) => {
        if (err) throw err;
        if (result.length) {
            let isEmail = { message: "Email existant" };
            res.send(isEmail)
        } else {
            const mdpHashed = await bcrypt.hash(motdepasse, 10);
            const sqlInsert = "INSERT INTO adherents (nom, prenom, email, motdepasse)VALUES(?,?,?,?)";
            const values = [nom, prenom, email, mdpHashed];
            connection.query(sqlInsert, values, (err, result) => {
                if (err) throw err;
                let resultBack = req.body;
                resultBack.id = result.insertId;
                console.log(req.body.chiens);
                // {
                //     req.body.chiens.map((d) => {
                //         // const {nomChien, naissance, race} = d;
                //         const sqlDog = "INSERT INTO chiens (nomChien, naissance, race, idAdher) VALUES (?,?,?,?)";
                //         const valuesDog = [d.nomChien, d.naissance, d.race, resultBack.id];
                //         connection.query(sqlDog, valuesDog, (err, result) => {
                //             if (err) throw err;
                //         })
                //         // let dogBack = req.body;
                //         // dogBack.id = result.insertId;
                //     })
                // }
                let isEmail = { messageGood: "inscription réussie" }
                res.send(isEmail)
            }
            )

        }
    })
})

module.exports = router;