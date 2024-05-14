const { Users } = require('../entity/Users')
const jwt = require('jsonwebtoken');
const options = require("../options");

const generateAccessToken = (user) => {
    return jwt.sign(user, options.TOKEN, { expiresIn: '222230s' });
}

class UsersController {
    
    async create(req, res, next) {
        try {

            let { name1, name2, email, password } = req.body
            let user = await Users.create({
                first_name: name1,
                surname: name2,
                email: email,
                password: password
            });

            return res.json(user)
        } catch (e) {
            console.log(e)
        }

    }

    async getAll(req, res) {
        try {
            let users = await Users.findAll()
            return res.json(users)
        } catch (e) {
            console.log(e)
        }
    }

    async login(req, res) {
        try {
            let { email, password } = req.body
            const user = { name: email };
            const us = await Users.findOne({ where: { email: email } })
            if (us) {
                if (us.dataValues.password == password) {
                    const accessToken = generateAccessToken(user);
                    res.json(accessToken);
                } else {
                    res.status(403).send({message: "Неверный пароль!"})
                }
            } else {
                res.status(404).send({message: "Пользователь не найден!"})
            }
        } catch (e) {
            console.log(e)
        }
    }

    // async getOne(req, res) {
    //     const {id} = req.params
    //     const device = await Device.findOne(
    //         {
    //             where: {id},
    //             include: [{model: DeviceInfo, as: 'info'}]
    //         },
    //     )
    //     return res.json(device)
    // }
}

module.exports = new UsersController()