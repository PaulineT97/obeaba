const router = require("express").Router();
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const { key, keyPub } = require("../../keys");
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "pauline.todeschini@gmail.com",
        pass: "sjpv wvqw avvy esgd",
    }
})


const connection = require("../../database");

router.post("/login", (req, res) => {
    // console.log(req.body);
    const { email, motdepasse } = req.body;
    const sqlVerify = `SELECT * FROM adherents WHERE email= ?`;
    connection.query(sqlVerify, [email], (err, result) => {
        try {
            if (result.length > 0) {
                if (bcrypt.compareSync(motdepasse, result[0].motdepasse)) {
                    const token = jsonwebtoken.sign({}, key, {
                        subject: result[0].idAdher.toString(),
                        expiresIn: 3600 * 24 * 30,
                        algorithm: "RS256",
                    });
                    res.cookie("token", token, { maxAge: 12 * 60 * 60 * 1000 });

                    // nb jours * nb heures par jour * nb minutes par heure * nb secondes par minute * nb millisecondes par seconde
                    // les éléments sont ajoutés de la droite vers la gauche

                    let idAd = result[0].idAdher;
                    const sqlData = `SELECT adherents.*, chiens.*, pratiquer.*, activites.nomActivites FROM adherents, chiens, pratiquer, activites WHERE adherents.idAdher= ? AND adherents.idAdher = chiens.idAdher AND chiens.idChien = pratiquer.idChien AND pratiquer.idActivites = activites.idActivites`;
                    connection.query(sqlData, [idAd], (err, result) => {
                        if (err) throw err;
                        // console.log(result);
                        res.json(result);
                    })
                } else {
                    res.status(400).json("Email et/ou mot de passe incorrects");
                }
            } else {
                res.status(400).json("Email et/ou mot de passe incorrects");
            }
        } catch (error) {
            console.log(error);
        }
    });
});

router.post("/register", (req, res) => {
    const { nom, prenom, email, motdepasse, chiens } = req.body;
    const verifyMailSql = `SELECT * FROM adherents WHERE email="${email}"`;
    connection.query(verifyMailSql, [email], async (err, result) => {
        if (err) throw err;
        if (result.length) {
            let message = { message: "Email existant" };
            res.send(message)
        } else {
            const mdpHashed = await bcrypt.hash(motdepasse, 10);
            const sqlInsert = "INSERT INTO adherents (nom, prenom, email, motdepasse)VALUES(?,?,?,?)";
            const values = [nom, prenom, email, mdpHashed];
            connection.query(sqlInsert, values, (err, result) => {
                if (err) throw err;
                let resultBack = req.body;
                resultBack.id = result.insertId;
                {
                    if (Array.isArray(req.body.chiens)) {
                        req.body.chiens.map((c) => {

                            const sqlDog = "INSERT INTO chiens (nomChien, naissance, race, idAdher) VALUES (?,?,?,?)";
                            const valuesDog = [c.nomChien, c.naissance, c.race, resultBack.id];
                            connection.query(sqlDog, valuesDog, (err, result) => {
                                if (err) throw err;
                            })
                            let dogBack = req.body;
                            dogBack.id = result.insertId;
                        })
                    }
                }
                let message = { messageGood: "inscription réussie, vous allez être redirigé" }
                res.send(message)
            }
            )

        }
    })
})

router.post("/update", (req, res) => {
    console.log("Received request to register:", req.body);
    const idAd = req.body.idAdher;
    const { nom, prenom, email } = req.body;
    const updateSql = `UPDATE adherents SET nom = ?, prenom = ?, email = ? WHERE idAdher="${idAd}"`;
    connection.query(updateSql, [nom, prenom, email], async (err, result) => {
        if (err) throw err;
        let resultBack = req.body;
        resultBack.id = result.insertId;

        let message = { messageGood: "Vos informations ont bien été modifiées" }
        res.send(message)
    }
    )
})


//NOTE - récupérer les infos du user lors de sa connexion 

router.get("/userConnected", (req, res) => {
    const { token } = req.cookies;
    if (token) {
        try {
            const decodedToken = jsonwebtoken.verify(token, keyPub, {
                algorithms: "RS256",
            });
            const sqlSelect =
                `SELECT adherents.*, chiens.* FROM adherents, chiens WHERE adherents.idAdher= ? AND adherents.idAdher = chiens.idAdher`;
            // `SELECT adherents.*, chiens.*, pratiquer.*, activites.nomActivites FROM adherents, chiens, pratiquer, activites WHERE adherents.idAdher= ? AND adherents.idAdher = chiens.idAdher AND chiens.idChien = pratiquer.idChien AND pratiquer.idActivites = activites.idActivites`;
            connection.query(sqlSelect, [decodedToken.sub], (err, result) => {
                if (err) throw err;
                const connectedUser = result[0];
                connectedUser.password = "";
                if (connectedUser) {
                    // console.log(connectedUser);
                    res.json(connectedUser);
                } else {
                    res.json(null);
                }
            });
        } catch (error) {
            console.log(error);
        }
    } else {
        res.json(null);
    }
});

router.delete('/logout', (req, res) => {
    res.clearCookie("token");
    res.end();
});

router.get("/resetPassword/:email", (req, res) => {
    console.log(req.params);
    const email = req.params.email;
    const sqlSearchMail = "SELECT * FROM adherents WHERE email = ?";
    connection.query(sqlSearchMail, [email], (err, result) => {
        if (err) throw err;
        if (result.length !== 0) {
            const confirmLink = `http://localhost:3000/ResetPassword?email=${email}`;
            const mailOptions = {
                from: "obeaba@fauxmail.com",
                to: email,
                subject: "Mot de passe oublié de tel site",
                text: `Cliquez sur ce lien pour modifier votre mot de passe : ${confirmLink}`,
            };
            transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                    throw err;
                } else {
                    res.end();
                }
            });
        }
    });
});

module.exports = router;