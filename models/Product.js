const S = require('sequelize');
const db = require('./index');
const Category = require('../models/Category');

class Product extends S.Model {};

Product.init({
    name: {
        type: S.STRING,
        allowNull: false
    },
    price: {
        type: S.INTEGER,
        allowNull: false
    },
    description: {
        type: S.STRING,
        allowNull: false
    },
    stock: {
        type: S.INTEGER,
        allowNull: false,
        set(value) {
            const name = this.getDataValue('name');
            if(value === 0) {
                this.setDataValue('state', false);
                this.setDataValue('name', `${name} NO DISPONIBLE`);
            } else {
                this.setDataValue('state', true);
                this.setDataValue('name', `${name}`);
            }
            this.setDataValue('stock', value)
        }
    },
    state: {
        type: S.BOOLEAN,
        defaultValue: true,
        set(value) {
            const name = this.getDataValue('name');
            if(value === false) {
                this.setDataValue('name', `${name} NO DISPONIBLE`);
            } else {
                this.setDataValue('name', `${name}`);
            }
            this.setDataValue('state', value);
        }
    },
    virtualPrice: {
        type: S.VIRTUAL,
        get() {
            return `$${this.price}`;
        }
    }

}, { sequelize: db, modelName: 'prod', timestamps: false });

/* Product.addHook('beforeCreate', function(product, options) {
    if(!product.state) {
        product.name = `NO DISPONIBLE ${product.name}`;
        options.fields.push('name');
    }
});
 */

Product.howManyNotAvailable = function() {
    return Product.findAll({
        where: {
            stock: {
                [S.Op.eq]: 0
            }
        }
    });
}

Product.prototype.profits = function() {
    return this.stock * this.price;
}

Product.belongsToMany(Category, { through: 'product_category'} );
Category.belongsToMany(Product, { through: 'product_category'} );

module.exports = Product;