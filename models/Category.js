const S = require('sequelize');
const db = require('./index');

class Category extends S.Model {};

Category.init({
    name: {
        type: S.STRING,
        allowNull: false
    }
}, { sequelize: db, modelName: 'cat', timestamps: false });


module.exports = Category;