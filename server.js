const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
var exphbs = require("express-handlebars");


const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/gorgeuserdb", { useNewUrlParser: true });

// Render homepage
app.get("/", (req, res) =>{
    db.User.find({}, (err, data=>{
        if(err){
            console.log(err);
            res.status(500).end()
        }else{
            res.send(data)
            // res.render("main", {users:....})
        }
    }))
})

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
// Add new user and new activity
app.post("/newnew", ({body}, res) => {
  console.log(body)
  const newShred ={
      date: body.date,
      activityName: body.activityName,
      activityDes: body.activityDes,
      rigor: body.rigor,
      mileage: body.mileage,
      duration: body.duration
  }
  db.User.create({name:body.name}).then( userObj => {
      console.log(userObj);
    db.Activity.create(newShred)
    .then(({_id}) => db.User.findOneAndUpdate(
      {_id: userObj._id}, 
      {$push: {activities: _id}}, 
      {new: true}))
  
      .then(dbUser => {
        res.json(dbUser);
      })
      .catch(err => {
        res.json(err);
      });
  })

//   db.Activity.create(newShred)
//   .then(({_id}) => db.User.findOneAndUpdate(
//     {_id: body._id}, 
//     {$push: {activities: _id}}, 
//     {new: true}))

//     .then(dbUser => {
//       res.json(dbUser);
//     })
//     .catch(err => {
//       res.json(err);
//     });
});

// Previous User and add an activity
app.post("/update/:id", ({body}, res) => { 
    let id= req.params.id
    db.Activity.create(body)
    .then((_id) => db.User.findOneAndUpdate(
        {id}, 
        {$push: { activities: _id}}, 
        {new: true}))

      .then(dbUser => {
        res.json(dbUser);
      })
      .catch(err => {
        res.json(err);
      });
  });


// Update User
app.put("/update/:user", (req, res) =>{
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
