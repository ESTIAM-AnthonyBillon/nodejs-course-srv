const express = require('express');
const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');

const app = express();
var cors = require('cors');

var multer = require('multer');
var upload = multer();

var dirToJson = require('dir-to-json'); 

var students = require("./students");
app.use(cors());
app.use('/students', students);
app.use(upload.array()); 
app.use(express.static('public'));

app.set('view engine', 'pug');
app.set('views', './views');

//Website
app.get('/', function(req, res) {
    res.render('index');
});

const start = async () => {
    try {
        await mongoose.connect('mongodb+srv://');
        console.log('MongoDB connected');
        app.listen(8080, () => console.log("Server is running at port 8080"));
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

start();