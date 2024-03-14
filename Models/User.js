const { Schema, model } = require('mongoose');
const { User } = require('.');

const userSchema = new Schema(
    {

        userName: {
            type: String,
            unique: true,
            required: true,
            trimmed: true,
        },
        email: {
            type: String,
            default: true,
            unique: true,
            //Must match a valid email address: true,
            match: [/.+@.+\..+/, 'need correct email format']
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'thought',
            },
        ],

        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user',
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

userSchema.virtual('friendCount').get(function(){
    return this.friends.length;
})

const User = model('user', userSchema);

module.exports = User;
