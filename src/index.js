const express = require("express");
const session = require("express-session");
const bcrypt = require("bcrypt");

require("dotenv").config();

const { connectDB } = require("./config");
const User = require("./models/User");

const app = express();
// convert data into json format
app.use(express.json());
// Static file
app.use(express.static("public"));

app.use(express.urlencoded({ extended: false }));
//use EJS as the view engine
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("login", {
        success: req.query.success,
        error: req.query.error
    });
});

app.get("/signup", (req, res) => {
    res.render("signup", { error: req.query.error });
});

app.use(
    session({
        secret: process.env.SESSION_SECRET || "dev_secret",
        resave: false,
        saveUninitialized: false
    })
);

app.get("/home", (req, res) => {
    if (!req.session.user) {
        return res.redirect("/?error=Veuillez%20vous%20connecter");
    }
    return res.render("home", { username: req.session.user.username });
});

// Register User
app.post("/signup", async (req, res) => {

    const data = {
        username: req.body.username,
        password: req.body.password
    }

    // Check if the username already exists in the database
    const existingUser = await User.findOne({ username: data.username });

    if (existingUser) {
        return res.redirect("/signup?error=Utilisateur%20deja%20existant");
    } else {
        // Hash the password using bcrypt
        const saltRounds = 10; // Number of salt rounds for bcrypt
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);

        data.password = hashedPassword; // Replace the original password with the hashed one

        const userdata = await User.create(data);
        console.log(userdata);
        return res.redirect("/?success=Compte%20cree%2C%20connectez-vous");
    }

});

// Login user 
app.post("/login", async (req, res) => {
    try {
        const check = await User.findOne({ username: req.body.username });
        if (!check) {
            return res.redirect("/?error=Utilisateur%20introuvable");
        }
        // Compare the hashed password from the database with the plaintext password
        const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
        if (!isPasswordMatch) {
            return res.redirect("/?error=Mot%20de%20passe%20incorrect");
        }
        else {
            req.session.user = { id: check._id, username: check.username };
            return res.render("home", { username: check.username });
        }
    }
    catch {
        return res.redirect("/?error=Erreur%20de%20connexion");
    }
});

app.post("/logout", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/?success=Deconnexion%20reussie");
    });
});

// Define Port for Application
const port = process.env.PORT || 5000;

async function startServer() {
    await connectDB();
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
}

startServer();
