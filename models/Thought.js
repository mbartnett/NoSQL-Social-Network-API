const { Schema, model, Types } = require("mongoose");
const moment = require("moment");

const reactionSchema = new Schema(
    {
        _id: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        toJSON: {
            getters: true,
            transform: (doc, ret) => {
                ret.createdAt = moment(ret.createdAt).format('MM-DD-YYYY, hh:mm:ss A');
                return ret;
            },
        },
        id: false,
    }
);

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        username: {
            type: String,
            required: true,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        // userId: {
        //     type: Schema.Types.ObjectId,
        //     ref: 'User',
        //     required: true
        // },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
            transform: (doc, ret) => {
                ret.createdAt = moment(ret.createdAt).format('MM-DD-YYYY, hh:mm:ss A');
                return ret;
            },
        },
        id: false,
    }
);

// thoughtSchema.pre('remove', function (next) {
//     console.log('Removing thought and associated reactions...');

//     this.model('User')
//         .findByIdAndUpdate(this.userId, { $pull: { thoughts: this._id } })
//         .then(() => {
//             this.model('Reaction').deleteMany({ thoughtId: this._id });
//         })
//         .then(() => next())
//         .catch(next);
// });

thoughtSchema.virtual("reactionCount").get(function () {
    return this.reactions.length;
});

const Thought = model("Thought", thoughtSchema);

module.exports = Thought;
