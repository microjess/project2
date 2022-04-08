const router = require("express").Router();
const { User, Comment, Blog_Post, Role } = require("../../models");
const adminTask = require("../../utils/adminTask");

//DELETE routes
//Admin delete a post and its comments
router.delete("/posts/:id", adminTask, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id);
    const user = userData.get({ plain: true });
    if (user.role_id == 1) {
      try {
        const search = Number(req.params.id);
        const post = await Blog_Post.findByPk(search);
        //Verifying that the user created this post
        try {
          const comments = await Comment.destroy({
            where: { post_id: search },
          });
          const post = await Blog_Post.destroy({ where: { id: search } });
          res.status(200).json(post);
        } catch (err) {
          res.status(404).json(err);
        }
      } catch (err) {
        res.json(err);
      }
    }
  } catch (error) {}
});
//Admin delete a comment
router.delete("/comments/:id", adminTask, async (req, res) => {
  const userData = await User.findByPk(req.session.user_id);
    const user = userData.get({ plain: true });
    console.log(user);
    if (user.role_id == 1) {
      try {
        const search = Number(req.params.id);
        const comment = await Comment.destroy({ where: { id: search } });
        res.status(200).json(comment);
      } catch (err) {
        res.status(404).json(err);
      }
    }
});

//get all routes
router.get("/posts", adminTask, async (req, res) => {
  const userData = await User.findByPk(req.session.user_id);
    const user = userData.get({ plain: true });
    console.log(user);
    if (user.role_id == 1) {
      try {
        const postData = await Blog_Post.findAll({});
        res.json(postData);
      } catch (err) {
        res.redirect("/login");
      }
    }
});
router.get("/comments", adminTask, async (req, res) => {
  const userData = await User.findByPk(req.session.user_id);
    const user = userData.get({ plain: true });
    console.log(user);
    if (user.role_id == 1) {
      try {
        const postData = await Comment.findAll({});
        res.json(postData);
      } catch (err) {
        res.redirect("/login");
      }
    }
});
router.get("/users", adminTask, async (req, res) => {
  const userData = await User.findByPk(req.session.user_id);
    const user = userData.get({ plain: true });
    console.log(user);
    if (user.role_id == 1) {
      try {
        const postData = await User.findAll({});
        res.json(postData);
      } catch (err) {
        res.redirect("/login");
      }
    }
});
router.get("/roles", adminTask, async (req, res) => {
  const userData = await User.findByPk(req.session.user_id);
    const user = userData.get({ plain: true });
    console.log(user);
    if (user.role_id == 1) {
      try {
        const postData = await Role.findAll({});
        res.json(postData);
      } catch (err) {
        res.redirect("/login");
      }
    }
});

//seeding
router.post("/seedall", adminTask, async (req, res) => {
  const userData = await User.findByPk(req.session.user_id);
    const user = userData.get({ plain: true });
    console.log(user);
    if (user.role_id == 1) {
      const sequelize = require("../../config/connection");
    
      const postData = require("../../seeds/postData.json");
      const commentData = require("../../seeds/commentData.json");
      const userData = require("../../seeds/userData.json");
      const roleData = require("../../seeds/roleData.json");
    
      const seedDatabase = async () => {
        await sequelize.sync({ force: true });
    
        const Roles = await Role.bulkCreate(roleData);
        const Users = await User.bulkCreate(userData);
        const Blog_Posts = await Blog_Post.bulkCreate(postData);
        const Comments = await Comment.bulkCreate(commentData);
      };
    
      seedDatabase();
      res.send("Seeded");
    }
});

module.exports = router;
