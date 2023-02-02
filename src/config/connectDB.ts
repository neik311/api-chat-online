import {Sequelize} from "sequelize"

const sequelize = new Sequelize('chatonline','root', '123456', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },

});

export default sequelize