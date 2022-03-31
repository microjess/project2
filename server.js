const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const compression = require('compression');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
// import sequelize connection
const app = express();
// app.use(compression())
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers for later
const hbs = exphbs.create({ helpers });

const sess = {
    secret: "Super secret secret",
    cookie: {
        //Setting max age of session to 20 minutes
        maxAge: 1200000,
        //When the protocol being used to connect to the server is HTTP, store session
        httpOnly: true,
        //When the protocol being used is HTTPS, dont use cookie
        secure: false,
        //use cookie only on our site
        sameSite: "strict",
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
    }),
};

app.use(session(sess));

//Setting handlebars as our view engine
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

// sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => { console.log(`App listening on port ${PORT}!`); });
});