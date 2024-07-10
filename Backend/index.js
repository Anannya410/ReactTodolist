import express from "express"
import bodyParser from "body-parser";
import cors from "cors";
import mysql from "mysql";

const app = express();

const port= 7000;

app.use(bodyParser.json());
app.use(cors());

const sqlconnect = mysql.createConnection({
    host:"localhost",
    user:"anannya",
    password:'Ana0410',
    database:'student_record'
});

sqlconnect.connect((err)=>{
    if(!err)
    {
        console.log("Database Connected");
    }else{
        console.error("Database Not Connected",err);
    }
});

app.get("/api/user",(req, res)=>{
    sqlconnect.query("select * from student",(err, rows)=>{
        if(!err)
        {
            res.send(rows);
        }
        else{
            console.log(err);
        }
    });
});

app.post("/api/adduser",(req,res)=>{
    const name=req.body.name;
    const enroll = req.body.enroll;
    const faculty = req.body.faculty;
    const email = req.body.email;
    const gender = req.body.gender;
    const address = req.body.address;
    const hall = req.body.hall;
    const course = req.body.course;
    const branch = req.body.branch;
    const semester = req.body.semester;

    var sql =`INSERT INTO student(Enroll_no, Faculty_no, Name, Address, Hall, Course, Branch, Semester, Gender, Email) VALUES('${enroll}','${faculty}','${name}','${address}','${hall}','${course}','${branch}','${semester}','${gender}','${email}')`;

    sqlconnect.query(sql, (err, result)=>{
        if(!err){
           res.status(200).json("User Registration Inserted Successfully"); 
        }else{
            console.log(err);
        }
    });
});

//fetch user data according to enrolment number
app.get("/api/fetchenroll/:Enroll_no",(req, res)=>{
    const Enroll_no = req.params.Enroll_no;

    sqlconnect.query(`select * from student WHERE Enroll_no = '${Enroll_no}'`,(err, rows)=>{
        if(!err)
        {
            res.send(rows);
        }
        else{
            console.log(err);
        }
    });
});

app.get("/api/login/:username/:password",(req, res)=>{
    const username = req.params.username;
    const password = req.params.password;

    sqlconnect.query(`select * from admin_info WHERE username = '${username}' && password = '${password}'`,(err, rows)=>{
        if(!err)
        {
            res.send(rows);
        }
        else{
            console.log(err);
        }
    });
});

//update a user
// app.put("/api/updateuser/:Enroll_no", (req, res) => {
//     const Enroll_no = req.params.Enroll_no;
//     const { enroll, name, faculty, email, gender, address, hall, course, branch, semester } = req.body;
//     const sql = `UPDATE student SET Enroll_no='${enroll}', Faculty_no='${faculty}', Name='${name}', Address='${address}', Hall='${hall}', Course='${course}', Branch='${branch}', Semester='${semester}', Gender='${gender}', Email='${email}' WHERE Enroll_no='${Enroll_no}'`;

//     sqlconnect.query(sql, (err, result) => {
//         if (!err) {
//             res.status(200).json("User Updated Successfully");
//         } else {
//             console.log(err);
//         }
//     });
// });

app.put("/api/updateuser/:Enroll_no", (req, res) => {
    const Enroll_no = req.params.Enroll_no;
    const { Name, Faculty_no, Email, Gender, Address, Hall, Course, Branch, Semester } = req.body;

    const sql = `UPDATE student SET Name=?, Faculty_no=?, Email=?, Gender=?, Address=?, Hall=?, Course=?, Branch=?, Semester=? WHERE Enroll_no=?`;

    sqlconnect.query(sql, [Name, Faculty_no, Email, Gender, Address, Hall, Course, Branch, Semester, Enroll_no], (err, result) => {
        if (!err) {
            res.status(200).json("User Updated Successfully");
        } else {
            console.log(err);
            res.status(500).json("Error updating user");
        }
    });
});

// Delete a user
app.delete("/api/deleteuser/:Enroll_no", (req, res) => {
    const Enroll_no = req.params.Enroll_no;
    const sql = `DELETE FROM student WHERE Enroll_no='${Enroll_no}'`;

    sqlconnect.query(sql, (err, result) => {
        if (!err) {
            res.status(200).json("User Deleted Successfully");
        } else {
            console.log(err);
        }
    });
});



app.listen(port, ()=>console.log("Server running on port 7000"));




///need to see the full text search
///need to change the post statement to include column semester_text