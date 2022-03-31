const { User, Comment, Blog_Post } = require("../models");

const router = require("express").Router();
require("dotenv").config();
//this is the root route for the website
router.get("/", async (req, res) => {
  try {
    const postData = await Blog_Post.findAll({
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
      limit: 50,
      order: [["id", "DESC"]],
    });
    const posts = postData.map((p) => p.get({ plain: true }));
    for (let i = 0; i < posts.length; i++) {
      const element = posts[i];
      const date = new Date(element.time_created);
      element.time_created = date.toLocaleDateString("en-US", {
        hour: "numeric",
        minute: "numeric",
      });
    }

    res.render("homepage", {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
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
