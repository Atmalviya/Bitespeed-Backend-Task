const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./config/database');
const identifyRouter = require('./routes/identify');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/identify', identifyRouter);

sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});
