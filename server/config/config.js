module.exports = {
    authentication: {
        jwtSecret: process.env.JWT_SECRET || 'secret'
    }
}