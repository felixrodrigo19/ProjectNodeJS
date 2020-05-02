var router = require('express')();

router.get('*', function (req, res) {
    res.json('urls para requisições http: /blog e /blog/comment');
});



module.exports = router;