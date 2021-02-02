const router = require('express').Router();
const Product = require('../models/Product');
const Category = require('../models/Category');
const Helpers = require('../helpers');
const Promise = require("bluebird");

router.get('/:id', async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const product = await Product.findByPk(id);
        res.send(product);
    } catch (e) {
        next(e);
    }
})

router.get('/', Helpers.isQuery, async (req, res, next) => {
    try {
        if(req.products) {
            res.send(req.products)
        } else {
            const products = await Product.findAll();
            res.send(products)
        }
    } catch (e) {
        next(e)
    }
});

router.post('/', async (req, res, next) => {
    try {
        let categories = Helpers.prepareCategories(req.body.categories);
        categories = categories.map(category => Category.findOrCreate({ where: { name: category } } ));

        const product = await Product.create({
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            state: req.body.state,
            stock: req.body.stock,
        });

        let cats = await Promise.all(categories);
        cats = cats.flat().filter(c => typeof c !== 'boolean');
        //console.log(cats);

        await product.addCat(cats);
        //product.getCat().then(cats => console.log(cats))

        res.send(product);
    } catch (e) {
        next(e)
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const product = await Product.findByPk(id);

        product.name = req.body.name;
        product.price = req.body.price;
        product.description = req.body.description;
        product.state = req.body.state;
        product.stock = req.body.stock;
        
        product.save();

        res.send(product)
    } catch (e) {
        next(e);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const product = await Product.findByPk(id);
        await product.destroy();

        res.send('Product deleted');
    } catch (e) {
        next(e);
    }
});

module.exports = router;