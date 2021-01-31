const Product = require('./models/Product');
const Category = require('./models/Category');
const S = require('sequelize');
//
const Helpers = {};

Helpers.isQuery = async function(req, res, next) {
    try {
        if(req.query.category) {
            const products = await Product.findAll({
                include: [{
                    model: Category,
                    where: {
                        name: req.query.category 
                    }
                }]
            });

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
        return {name: ele.trim()}
    });
    return myArr;
}

module.exports = Helpers;