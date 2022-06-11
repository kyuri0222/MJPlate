const { Sequelize } = require("sequelize");

module.exports = class Restr extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      { 
        restr_name: {
          type: Sequelize.STRING(250),
          allowNull: false,
        },
        restr_type: {
            type: Sequelize.STRING(250),
            allowNull: false,
          },
          restr_locate: {
            type: Sequelize.STRING(250),
            allowNull: false,
          },
          restr_desc: {
            type: Sequelize.STRING(550),
            allowNull: false,
          }
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "Restr",
        tableName: "Restr",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    db.Restr.hasMany(db.User_Restr, {foreignKey: 'Restr_id', sourceKey: 'id'});
  }
};