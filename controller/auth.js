const jwt = require('jsonwebtoken');
const {user} = require("../models"); 
const { comparePassword } = require('../helpers/password-helpers');

class Auth {
    static login(req, res) {
        const email = req.body.email;
        const password = req.body.password; 
        user.findOne({ where: { email } })
            .then(user => { 
                if (user) {
                    const comparePass = comparePassword(password, user.password)
                    if (comparePass) {
                        const token = jwt.sign({
                            id: user.id,
                            email: user.email
                        }, process.env.JWT_SECRET, { expiresIn: "15m" }); 

                        res.status(200).json({ token })
                    } else {
                        throw { msg: "invalid email or password" }
                    }
                } else {
                    throw { msg: "invalid email or password" }
                }
            })
            .catch(err => { 
                res.status(500).json({ message: err })
            })
    }

    static logout = async (req, res, next) => {  
        res.status(201).json({ 
            message: 'success'
        });
    }
}

module.exports = Auth;