const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// routes
const institucija = require('./api/institucija');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('home');
})
app.use('/institucija', institucija);

app.listen(8080, () => {
    console.log('Server runing on port 8080');
})