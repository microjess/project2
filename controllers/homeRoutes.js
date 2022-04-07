const { User, Comment, Blog_Post } = require("../models");

const router = require("express").Router();
require("dotenv").config();
//this is the root route for the website
router.get("/", async(req, res) => {
    res.render("landingpage");
});

//These routes help other routes redirect to /login with the auth middleware
router.get("/login", (req, res) => {
    res.render("login");
});
router.put("/login", (req, res) => {
    res.render("login");
});
router.delete("/login", (req, res) => {
    res.render("login");
});

module.exports = router;