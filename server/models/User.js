const mongoose = require('mongoose'),
    bcrypt = require('bcrypt-nodejs'),
    schema = mongoose.Schema,
    SALT_WORK_FACTOR = 10

let userSchema = mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    verified: {
        type: Boolean,
        required: true,
        default: false
    },
    admin: {
        type: Boolean,
        required: true,
        default: false
    },
    admin_scopes: {
        type: [String],
        enum: ['epitech.eu']
    },
    gender: {
        type: String,
        enum: ['MALE', 'FEMALE'],
        required: true
    },
    sexual_orientation: {
        type: String,
        enum: ['STRAIGHT', 'HOMO', 'BI'],
        required: true
    }
})

userSchema.methods.comparePassword = function(candidatePassword) {
    return bcrypt.compareSync(candidatePassword, this.password)
}

userSchema.pre('save', function(next) {
    let user = this

    if (!user.isModified('password')) return next()

    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err)

        bcrypt.hash(user.password, salt, function() {},  function(error, encrypted) {
            if (error) return next(error)

            user.password = encrypted
            next()
        })
    })
})

module.exports = mongoose.model('User', userSchema)