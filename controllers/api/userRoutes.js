const router = require("express").Router();
const User = require("../../models/User");
//creating a user
router.post("/", async (req, res) => {
  //check if username has been used
  try {
    const userData = await User.findOne({ where: { name: req.body.name } });
    if (userData) {
      res.statusMessage = "Username must be unique";
      res.status(409).end();
      return;
    }
  } catch (err) {}
  //check if email has been used
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });
    if (userData) {
      res.statusMessage = "Email must be unique";
      res.status(409).end();
      return;
    }
  } catch (err) {}
  //use regex to verify email is email format
  const emailRegex =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  //min 8 chars, 1 or more special character, 1 or more numbers, 1 or more lowercase, 1 or more uppercase
  const passRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!emailRegex.test(req.body.email)) {
    res.statusMessage = "Email not in correct format";
    res.status(409).end();
    return;
  }
  //use regex to verify password has minimum requirements
  if (!passRegex.test(req.body.password)) {
    res.statusMessage = "Password not in correct format";
    res.status(409).end();
    return;
  }

  try {
    const userData = await User.create({
      ...req.body,
      role_id: 2,
    });
    //creating session for the new user
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});
//Loging in user
router.post("/login", async (req, res) => {
  //use regex to verify email is email format
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res.statusMessage = "Incorrect email, please try again";
      res.status(400).end();
      return;
    }
    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res.statusMessage = "Incorrect password, please try again";
      res.status(400).end();
      return;
    }
    //Creating a new session for the logged in user
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      req.session.role_id = userData.role_id;

      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }
});
//destroying the users session and thus logging them out
router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
