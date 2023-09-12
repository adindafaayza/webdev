const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "crud"
})

app.get("/", (_req, res) => {
    const sql = "SELECT * FROM student";
    db.query(sql, (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.post("/create", (_req, res) => {
    const sql = "INSERT INTO student (`Name`, `Email`) VALUES (?)";
    const values = [
        _req.body.name,
        _req.body.email
    ]
    db.query(sql, [values], (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.put("/update/:id", (_req, res) => {
    const sql = "update student set `Name` = ?, `Email` = ? where ID = ?";
    const values = [
        _req.body.name,
        _req.body.email
    ]
    const id = _req.params.id

    db.query(sql, [...values, id], (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.delete("/student/:id", (_req, res) => {
    const sql = "DELETE FROM student WHERE ID = ?";
    const id = _req.params.id

    db.query(sql, [id], (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.listen(8081, () => {
    console.log("listening");
})