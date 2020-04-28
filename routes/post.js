var express = require('express');
var router = express.Router();
const mongooseDB = require('../model/connection')
const postDB = require('../model/posts')

// Busca no banco a ultima postagem
router.get('/blog', async (req, res) => {
    mongooseDB.conectar()
    try {
        let lastPost = await postDB.findOne().sort({ _id: -1 })
        //MySchema.find().sort({ _id: -1 }).limit(10)
        res.json(lastPost)

        mongooseDB.close()
    } catch (err) {
        console.log(err)
        mongooseDB.close()
    }
});


router.route('/blog/pc/')
    .all(function (req, res, next) {
        // runs for all HTTP verbs first
        // think of it as route specific middleware!
        next()
    })
    .get(async function (req, res, next) {
        mongooseDB.conectar()

        try {
            let postOfPc = await postDB.find().where({ categories: 'PC' }).sort({ _id: -1 })

            res.json(postOfPc)

            mongooseDB.close()
        } catch (err) {
            console.log(err)
            mongooseDB.close()
        }
    })
    .put(async function (req, res, next) {

        mongooseDB.conectar()
        try {
            console.log(req.body)
            let data = req.body
            let where = { _id: data.id }
            let update = data

            let updatePost = await postDB.findOneAndUpdate(where, update)

            res.json(updatePost)
            mongooseDB.close()

        } catch (err) {
            console.log(err)
            mongooseDB.close()
        }
    })
    .post(async function (req, res, next) {
        let author = req.body.author
        let title = req.body.title
        let body = req.body.body

        if ((!author) || (!title) || (!body)) {
            res.json('O post não deve ser publicado sem um título, autor ou nenhum conteúdo')
        }

        mongooseDB.conectar()
        try {
            console.log(req.body)
            let post = await postDB.create(req.body)
            res.json(post)
            mongooseDB.close()
        } catch (err) {
            console.log(err)
            mongooseDB.close()
        }
    })
    .delete(async function (req, res, next) {
        mongooseDB.conectar()

        try {
            let id = req.body.id
            let excluir = await postDB.findByIdAndDelete(id)

            res.json(excluir)
            mongooseDB.close()
        } catch (err) {
            console.log(err)
            mongooseDB.close()
        }
    })

module.exports = router;