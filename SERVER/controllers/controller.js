const { comparePassword } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')
const {User} = require('../models')
class Controller {

static async login(req,res,next){
    try {
        const { username, password } = req.body
            if(!username || !password) {
                throw { name : "EMAIL_OR_PASSWORD_REQUIRED"}
            }

            const foundUser = await User.findOne({
                where : {
                    username
                }
            })

            if(!foundUser) {
                throw { name : "UNAUTHORIZED"}
            }

            const checkPass = comparePassword(password, foundUser.password)

            if(!checkPass) {
                throw {name : "UNAUTHORIZED"}
            }

            const access_token = signToken({
                id : foundUser.id
            })

            res.status(200).json({
                access_token
            })

    } catch (error) {
        console.log(error)
        next(error)
    }
}
    static async register (req, res, next) {
        try {
            const {username, password} = req.body
            const newUser = await User.create({username, password,})
            res.status(201).json({
                message : `Success make an account with ${username}`
            })
        } catch (error) {
            console.log(error)
            next(error)
        }
    }


}
module.exports = {Controller}