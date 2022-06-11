const { Sequelize } = require("sequelize");

module.exports = class User_Restr extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "User_Restr",
        tableName: "User_Restr",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    db.User_Restr.belongsTo(db.User, {foreignKey: 'User_id', targetKey: 'id'});
    db.User_Restr.belongsTo(db.Restr, {foreignKey: 'Restr_id', targetKey: 'id'});  
  }
};