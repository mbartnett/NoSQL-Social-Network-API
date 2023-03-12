const { Schema, model } = require("mongoose");
const Thought = require('./Thought');

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, "Please enter a valid e-mail address"],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

userSchema.pre('remove', function (next) {
  console.log("Removing user and associated thoughts...");
  Thought.deleteMany({ userId: this._id })
    .then(() => next())
    .catch(next);
});

// userSchema.pre('remove', function (next) {
//   console.log("Removing user and associated thoughts...");
//   Thought.deleteMany({ _id: { $in: this.thoughts } })
//     .then(() => next())
//     .catch(next);
// });

// userSchema.pre('remove', function (next) {
//   console.log("Removing user and associated thoughts...");
//   Thought.deleteMany({ username: this.username })
//     .then(() => next())
//     .catch(next);
// });

const User = model("User", userSchema);

module.exports = User;
