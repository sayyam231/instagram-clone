const express = require('express');
const app = express();
const port = 8000;
const expressLayout = require('express-ejs-layouts');
const db = require('./config/mongoose');


// use express layouts
app.use(express.static('./assets'));
app.use(expressLayout);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
// use express router
app.use('/', require('./routes/index'));
// set view engine
app.set('view engine', 'ejs');
app.set('views', './views');


// listen to port
app.listen(port, (err) => {
    if(err)
        console.log(`Error: ${err}`);
    console.log(`Server is running on port: ${port}`);
});