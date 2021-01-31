const router = require('express').Router();
const Product = require('../models/Product');
const Category = require('../models/Category');
const Helpers = require('../helpers');

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
        const categories = Helpers.prepareCategories(req.body.categories);
        const product = await Product.create({
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            state: req.body.state,
            stock: req.body.stock,
            cats: categories
        }, {
            include: 'cats'
        });
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
        //product.getCats().then(cats => console.log(cats));

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