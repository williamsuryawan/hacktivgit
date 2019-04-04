const bcrypt = require('bcrypt')

const saltRounds = 5;
const salt = bcrypt.genSaltSync(saltRounds)

module.exports = (password) => {
    console.log("halo bcrypt ===")
    return bcrypt.hashSync(password, salt)
}