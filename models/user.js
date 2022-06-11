const { Sequelize } = require("sequelize");

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        user_ID: {
            type: Sequelize.STRING(50),
            allowNull: false,
            unique: true,
        },
        user_PW: {
            type: Sequelize.STRING(250),
            allowNull: false,
        },
        user_name: {
            type: Sequelize.STRING(50),
            allowNull: false,
        },
        user_birth: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        user_phoneNum: {
            type: Sequelize.STRING(250),
            allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "User",
        tableName: "User",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    db.User.hasOne(db.User_Restr, {foreignKey: 'User_id', sourceKey: 'id'});

  }
};
