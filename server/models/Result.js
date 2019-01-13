const mongoose = require('mongoose'),
    schema = mongoose.Schema

let resultSchema = mongoose.Schema({
    user_fk_id: {
        type: schema.ObjectId,
        required: true
    },
    form_fk_id: {
        type: schema.ObjectId,
        required: true
    },
    results: {
        type: Map,
        of: Number,
        min: 0,
        max: 100,
        required: true
    }
})

module.exports = mongoose.model('Result_Schema', resultSchema)