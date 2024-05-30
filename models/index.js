const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('news_bpoo', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
});

const connectToDb = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
module.exports = { 
    sequelize,
    connectToDb
}