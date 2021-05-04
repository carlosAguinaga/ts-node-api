import {Sequelize} from 'sequelize';

const db = new Sequelize('node', 'root', 'root', {
    host: 'localhost',
    port: 8889,
    dialect: 'mysql',
    // logging: false
})

export default db;

