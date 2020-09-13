const mongoose = require('mongoose')

let userSchema = new mongoose.Schema(
    {
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    leader: {
        type: Boolean,
        required: true,
    },
    followers: {
        type: Number,
        required: true,
    }
    }, { timestamps: true },
    );
    // finds a user by their an abstract "login" term, which is the username or email in the end, in the database.
    userSchema.statics.findByLogin = async function (login) {
        let user = await this.findOne({
          username: login,
        });
       
        if (!user) {
          user = await this.findOne({ email: login });
        }
       
        return user;
      };
    // remove all portfolios and stocks in case user is deleted with cascade delete
      userSchema.pre('remove', function(next) {
        this.model('Portfolio').deleteMany({ user: this._id }, next);
      });
      userSchema.pre('remove', function(next) {
        this.model('Stock').deleteMany({ user: this._id }, next);
      });
let User = mongoose.model("User", userSchema)

exports.User = User;