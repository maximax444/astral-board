const { Pages } = require('../entity/Pages');
const jwt = require('jsonwebtoken');
const options = require("../options");
const { log } = require('console');

const generateAccessToken = (user) => {
    return jwt.sign(user, options.TOKEN, { expiresIn: '222230s' });
};

const getPageById = async (page_id) => {
    try {

        let page = await Pages.findOne({ where: { id: Number(page_id) } });
        return page.dataValues.path;
    } catch (e) {
        console.log(e);
        return "";
    }
};

class PagesController {

    async create(req, res, next) {
        try {
            let { title, slug, parent_id } = req.body;
            let currPath = "/" + slug;
            if (parent_id != -1) {
                const currPageSlug = await getPageById(parent_id);
                if (currPageSlug == "/") {
                    console.log("asd");
                    currPath = currPageSlug + slug;
                } else {
                    currPath = currPageSlug + "/" + slug;
                }
            }
            let page = await Pages.create({
                title: title,
                slug: slug,
                parent_id: parent_id,
                path: currPath
            });

            return res.json(page);
        } catch (e) {
            console.log(e);
        }

    }

    async getAll(req, res) {
        try {
            let pages = await Pages.findAll();
            return res.json(pages);
        } catch (e) {
            console.log(e);
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

    async getOne(req, res) {
        const {id} = req.params;
        const page = await Pages.findOne(
            {
                where: {id}
            },
        );
        return res.json(page);
    }
}

module.exports = new PagesController();