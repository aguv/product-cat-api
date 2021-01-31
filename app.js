const express = require('express');
const morgan = require('morgan');
const db = require('./models/index');
const routes = require('./routes/index');

console.log(process.env.PWD)

//

const app = express();

app.use(express.urlencoded( { extended: false } ));
app.use(express.json());
app.use(morgan('tiny'));

app.use(routes);

// error middleware
app.use((err, req, res, next) => {
    res.status(err.status || 500).send(err.message);
});


//
const PORT = 3000;

const dbSwitch = async () => {
    try {
        await db.sync();
        console.log('Sequelize on');
        app.listen(PORT, () => {
            console.log(`Server listening on port: ${PORT}`);
        })
    } catch (e) {
        console.log(e);
    }
}

dbSwitch();
/* db.sync({force: false})
    .then(() => {
        console.log('Sequelize on!');
        app.listen(PORT, () => {
            
        });
    })
    .catch(err => console.log(err));
 */