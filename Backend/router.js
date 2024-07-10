import express from "express"
import sqlDbconnect from "./dbconnect.js"

const router = express.Router();

router.get("/api/user",(req, res)=>{
    sqlDbconnect.query("select * from student",(err, rows)=>{
        if(!err)
        {
            res.send(rows);
        }
        else{
            console.log(err);
        }
    });
});

export default router;