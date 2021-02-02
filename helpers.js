const Product = require('./models/Product');
const Category = require('./models/Category');
const S = require('sequelize');
//
const Helpers = {};

Helpers.isQuery = async function(req, res, next) {
    try {
        if(req.query.category) {
            const category = await Category.findOne({ where: { name: req.query.category }});
            const products = await category.getProd();

            req.products = products;
            next();
        } else {
            next();
        }

    } catch (e) {
        next(e)
    }
}

Helpers.prepareCategories = function(string) {
    let myArr = string.split(',');
    myArr = myArr.map(ele => {
        return ele.trim();
    });
    return myArr;
}

module.exports = Helpers;