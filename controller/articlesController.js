const { Pages } = require('../entity/Pages')
const jwt = require('jsonwebtoken');
const options = require("../options");
const { log } = require('console');
const { Articles } = require('../entity/Articles');
const { Categories } = require('../entity/Categories');

const generateAccessToken = (user) => {
    return jwt.sign(user, options.TOKEN, { expiresIn: '222230s' });
}

class ArticlesController {

    async create(req, res, next) {
        try {
            console.log(req.body);
            let { title, descr, slug, category_id } = req.body

            let cat = await Categories.findOne({ where: { id: category_id } })
            console.log(req.file);
            let art = await Articles.create({
                title: title,
                descr: descr,
                slug: slug,
                articleImg: req.file.path
            })

            art.setCategory(cat)
            return res.json(art)
        } catch (e) {
            console.log(e)
        }

    }

    async getAll(req, res) {
        try {
            let articles = await Articles.findAll({
                include: [
                    {
                        model: Categories,
                        as: 'Category' // <--------- Here is the magic
                    }
                ]
            })
            return res.json(articles)
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
    async delete(req, res) {
        try {
            let art = await Articles.destroy({ where: { id: req.params.artId } })
            return res.json(art)
        } catch (e) {
            console.log(e)
        }
    }

    async getOne(req, res) {
        try {
            let art = await Articles.findOne({ where: { id: req.params.artId } })
            console.log(art);
            return res.json(art)
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new ArticlesController()