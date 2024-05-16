const { Pages } = require('../entity/Pages')
const jwt = require('jsonwebtoken');
const options = require("../options");
const { log } = require('console');
const { Categories } = require('../entity/Categories');

const generateAccessToken = (user) => {
    return jwt.sign(user, options.TOKEN, { expiresIn: '222230s' });
}

class CategoriesController {

    async create(req, res, next) {
        try {
            let { title, slug } = req.body

            let cat = await Categories.create({
                title: title,
                slug: slug
            });

            return res.json(cat)
        } catch (e) {
            console.log(e)
        }

    }

    async update(req, res, next) {
        try {
            let { id, title, slug } = req.body
            const cat = await Categories.findOne({ where: { id: id } })
            cat.title = title
            cat.slug = slug
            cat.save();

            return res.json(cat)
        } catch (e) {
            console.log(e)
        }

    }

    async delete(req, res) {
        try {
            let cat = await Categories.destroy({ where: { id: req.params.catId } })
            return res.json(cat)
        } catch (e) {
            console.log(e)
        }
    }

    async getAll(req, res) {
        try {
            let cats = await Categories.findAll()
            return res.json(cats)
        } catch (e) {
            console.log(e)
        }
    }

    // async login(req, res) {
    //     try {
    //         let { email, password } = req.body
    //         const user = { name: email };
    //         const us = await Users.findOne({ where: { email: email } })
    //         if (us) {
    //             if (us.dataValues.password == password) {
    //                 const accessToken = generateAccessToken(user);
    //                 res.json(accessToken);
    //             } else {
    //                 res.status(403).send({message: "Неверный пароль!"})
    //             }
    //         } else {
    //             res.status(404).send({message: "Пользователь не найден!"})
    //         }
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }

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

module.exports = new CategoriesController()