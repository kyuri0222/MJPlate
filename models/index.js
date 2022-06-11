const Sequelize = require('sequelize');
const User = require('./user');
const Restr = require('./restr');
const User_Restr = require('./user_restr');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;

db.User = User;
db.Restr = Restr;
db.User_Restr = User_Restr;

User.init(sequelize);
Restr.init(sequelize);
User_Restr.init(sequelize);

User.associate(db);
Restr.associate(db);
User_Restr.associate(db);

module.exports = db;