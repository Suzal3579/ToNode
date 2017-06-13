let express = require('express');
let router = express.Router();
const mongoose = require("mongoose");
mongoose.connect("localhost:27017/test");

let ItemSchema = mongoose.Schema;
let itemDataSchema = new ItemSchema({
    item: String
}, { collection: "item-data" });

let itemData = mongoose.model("itemData", itemDataSchema);

/* GET home page. */
router.get('/', (req, res, next) => {
    res.redirect('/getdata');
});

router.post("/insert", (req, res, next) => {
    let itemList = {
        item: req.body.item
    };
    let itemInstance = new itemData(itemList);
    itemInstance.save();
    res.redirect("/getdata");
});

router.get("/getdata", (req, res, next) => {
    itemData.find({}, (err, docs) => {
        res.render("index", { itemListData: docs });
    })
});

router.get("/update/:id", (req, res, next) => {
    let id = req.params.id;
    res.render("update", { id: id });
});

router.post("/updateItem/:id", (req, res, next) => {
    let id = req.params.id;
    itemData.findById(id, (error, docs) => {
        if (error) {
            res.render("error", { error: error });
        } else {
            docs.item = req.body.item;
            docs.save();
            res.redirect("/getdata");
        }
    });
});

router.get("/delete/:id", (req, res, next) => {
    let id = req.params.id;
    itemData.findByIdAndRemove(id).exec();
    res.redirect("/getdata");
});


module.exports = router;
