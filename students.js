var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();

const { Student } = require("./models");

router.use(bodyParser.urlencoded({ extended: true })); 

// --------- Frontend

router.get('/add', function(req, res) {
    res.render('createUser');
});


// --------- Backend

//// Students

// Get all students
router.get('/', async (req, res) => {
    try {
        const allStudents = await Student.find();
        return res.status(200).json(allStudents);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Get student data by id
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const student = await Student.findById(id);

        return res.status(200).json(student);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Update student data by id
router.post('/update', async (req, res) => {
    try {
        const userData = req.body;

        await Student.findByIdAndUpdate(student._id, {
            name: userData.name,
        });
        
        return res.status(200).json({ message: "User updated" });
    }
    catch (err) {
        res.status(500).send(err);
    }
});

// Create a new student
router.post("/create", function (req, res){
    try {
        var studentInfo = req.body;

        if(!studentInfo.name || !studentInfo.email || !studentInfo.password) {
            res.render('show_message', {message: "Sorry, you provided wrong info", type: "error"});
        } else {
            const newStudent = new Student({
                name: studentInfo.name,
                email: studentInfo.email,
                password: studentInfo.password
            });

            console.log(newStudent);

            newStudent.save()
                .then((studentInfo)=>{
                    res.render("show_message", {message: "New student added", type: "success", student: studentInfo});
                }).catch((err)=>{
                    res.render('show_message', {message: "Database error", type: "error"});
                });
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

//Suppression d'un utilisateur par son id
router.post("/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const deleteStudent = await Student.findByIdAndDelete(id);

        res.status(200).json(deleteStudent);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Delete all students
//router.delete("/usersDeleteAll", async (req, res) => {
//    const student = await User.deleteMany();
//    return res.status(200).json(user);
//});

module.exports = router;