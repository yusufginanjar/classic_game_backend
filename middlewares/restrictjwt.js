const passportjwt = require('../lib/passportjwt')
    module.exports = passportjwt.authenticate('jwt', {
    session: false
})