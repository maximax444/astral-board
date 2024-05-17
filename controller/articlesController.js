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

    async update(req, res, next) {
        try {
            let { id, title, descr, slug, text, category_id } = req.body

            let cat = await Categories.findOne({ where: { id: category_id } })

            let art = await Articles.findOne({ where: { id: id } })
            if (req.file) {
                art.articleImg = req.file.path
            }
            art.title = title
            art.descr = descr
            art.slug = slug
            art.setCategory(cat)
            art.text = text
            art.save()
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
            let art = await Articles.findOne({
                where: { id: req.params.artId },
                include: [
                    {
                        model: Categories,
                        as: 'Category' // <--------- Here is the magic
                    }
                ]
            })
            console.log(art);
            return res.json(art)
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new ArticlesController()