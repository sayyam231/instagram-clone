const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayout = require('express-ejs-layouts');
const db = require('./config/mongoose');
// express session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');

app.use(express.urlencoded());
app.use(cookieParser());

// use express layouts
app.use(express.static('./assets'));
app.use(expressLayout);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
// set view engine
app.set('view engine', 'ejs');
app.set('views', './views');


// Local Strategy authentication
app.use(session({
    name: "Instagram",
    // TODO change the secret in the production deployment
    store: MongoStore.create({
        mongoUrl: "mongodb://localhost/instagram",
        autoRemove : "disabled"
    }, function (err) {
        if (err) {
            console.log(err || "connect-Mongo Set up ok");
        }
    }),
    secret: "Instagram is fun addictive",
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    }
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
// use express router
app.use('/', require('./routes/index'));
// listen to port
app.listen(port, (err) => {
    if(err)
    console.log(`Error: ${err}`);
    console.log(`Server is running on port: ${port}`);
});