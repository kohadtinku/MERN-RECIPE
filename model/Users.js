const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  savedRecipe: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref:"recipe",
      required: true,
    },
  ],
});

const userModal = mongoose.model("user", userSchema);

module.exports = userModal;
