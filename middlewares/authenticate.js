const { verifyToken } = require("../helpers/jwt");
const { user } = require('../models');

const authenticate = async (req, res, next) => {

    if (req.headers.authorization == undefined) {
        res.status(401).json({ message: "Unathorized" })
    } else {
        const token = req.headers.authorization.split(' ')[1];
        try { 
            let { email, exp } = await verifyToken(token) 
            await user.findOne({ where: { email } })
                .then(user => {
                    req.currentUser = { id: user.id, email: user.email }
                    next()
                })
                .catch(err => {
                    throw {
                        name: "customError",
                        msg: `Unathorized`,
                        status: 401
                    }
                })
        } catch (error) {
            res.status(401).json({ message: "Unathorized" })
        }
    }
};

module.exports = {
    authenticate
}