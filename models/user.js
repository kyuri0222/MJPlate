const { Sequelize } = require("sequelize");

// user 테이블
module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        user_ID: {
            type: Sequelize.STRING(50),
            allowNull: true,
            unique: true,
        },
        user_PW: {
            type: Sequelize.STRING(250),
            allowNull: true,
        },
        user_name: {
            type: Sequelize.STRING(50),
            allowNull: true,
        },
        user_birth: {
            type: Sequelize.DATE,
            allowNull: true,
        },
        user_phoneNum: {
            type: Sequelize.STRING(250),
            allowNull: true,
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
