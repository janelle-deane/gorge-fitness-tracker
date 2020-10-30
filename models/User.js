const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    match: [/.+@.+\..+/, "Please enter a valid e-mail address"]
},
  activities: [
    {
      type: Schema.Types.ObjectId,
      ref: "Activity"
    }
  ]
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
