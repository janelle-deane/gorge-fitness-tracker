const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ActivitySchema = new Schema({
    date: {
        type: Date,
    },
    email: {
        type: String,
        match: [/.+@.+\..+/, "Please enter a valid e-mail address"]
    },
    activityName: {
        type: String,
    },
   rigor: {
        type: String,
    },
    mileage: {
        type: Number,
    },
    duration:{
        type: Number,
    }

});

const Activity = mongoose.model("Activity", ActivitySchema);

module.exports = Activity;
