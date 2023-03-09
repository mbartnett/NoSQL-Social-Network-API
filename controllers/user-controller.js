
const { User, Thought } = require("../models");

const UserController = {
    getAllUsers(req, res) {
        User.find({})
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err));
    },

    getUserById(req, res) {
        User.findOne({ _id: req.params.userId })
        .select("-__v")
        .then((user) =>
            !user
            ? res.status(404).json({ message: "No user found with this id!" })
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },

    createUser(req, res) {
        User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((user) =>
            !user
            ? res.status(404).json({ message: "No user found with this id!" })
            : res.json(user)
        )
        .catch((err) => {
            res.status(500).json(err);
        });
    },

    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
        .then((user) =>
            !user
            ? res.status(404).json({ message: "No user found with this id!" })
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },

    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $push: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )
        .then((user) =>
            !user
            ? res.status(404).json({ message: "No user found with this id!" })
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },

    removeFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )
        .then((user) =>
            !user
            ? res.status(404).json({ message: "No user found with this id!" })
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
};

module.exports = UserController;