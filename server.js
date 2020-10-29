const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");


const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/userdb", { useNewUrlParser: true });


app.get("/all", (req, res) =>{
    db.User.find({}, (err, data=>{
        if(err){
            console.log(err);
            res.status(500).end()
        }else{
            res.send(data)
        }
    }))
})

app.post("/submit", ({body}, res) => {
  db.User.create(body)
    .then(dbUser => {
      res.json(dbUser);
    })
    .catch(err => {
      res.json(err);
    });
});

app.post("/update/:date", (req, res) =>{
    db.User.update({date}, (err, data=>{
        if(err){
            console.log(err);
            res.status(500).end()
        }else{
            res.send(data)
        }
    }))
})

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
