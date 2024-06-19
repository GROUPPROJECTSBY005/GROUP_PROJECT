const bcrypt = require('bcryptjs');

function hashPassword(password) {
    var salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

const comparePassword = (password, passwordDB) => {
    return bcrypt.compareSync(password, passwordDB);
}

module.exports = {hashPassword, comparePassword}