var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index');
});

router.post("/insert", (req, res, next) => {
    let lists = {

    };
});

module.exports = router;
