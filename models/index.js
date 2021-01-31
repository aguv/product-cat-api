const Sequelize = require('sequelize');

const S = new Sequelize('postgres://postgres:madrid912@localhost:5432/product-api', {
    logging: false,
    dialect: 'postgres'
});

module.exports = S;
