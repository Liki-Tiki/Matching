const Joi = require('joi')

module.exports = {
    register (req, res, next) {
        const whiteList = "epitech.eu"

        const schema = {
            email: Joi.string().regex(new RegExp('^.+\\..+@'+ whiteList + '$')).required(),
            password: Joi.string().alphanum().min(8).max(32).required(),
            gender: Joi.string().regex(new RegExp('^MALE|FEMALE$')).required(),
            sexualOrientation: Joi.string().regex(new RegExp('^STRAIGHT|HOMO|BI$')).required()
        }

        const {error, value} = Joi.validate(req.body, schema)
        if (error) {
            switch (error.details[0].context.key) {
                case 'email':
                    res.status(400).send({
                        error: 'You must register with a valid email.'
                    })
                    break
                case 'password':
                    res.status(400).send({
                        error: 'The password provided failed to match the following rules:' +

                            '<br>' +
                            '1. It must contain ONLY the following characters: lower case, upper case, numeric' +
                            '<br>' +
                            '2. It must be at least 8 characters length and not greater than 32 characters'
                    })
                    break
                case 'sexualOrientation':
                    res.status(400).send({
                        error: 'Invalid sexualOrientation.'
                    })
                    break
                case 'gender':
                    res.status(400).send({
                        error: 'Invalid gender.'
                    })
                    break
                default:
                    res.status(400).send({
                        error: 'Invalid registration informations'
                    })
                    break
            }
        } else {
            next()
        }
    }
}