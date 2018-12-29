const mongoose = require('mongoose'),
    schema = mongoose.Schema

let formSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    form_questions: {
        type: [schema.ObjectId],
        required: true
    },
    active: {
        type: Boolean,
        required: true,
        default: false
    },
    accessibility_scopes: {
        type: [String]
    }
})

module.exports = mongoose.model('Form', formSchema)