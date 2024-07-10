import mysql from "mysql";

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

export default sqlconnect;