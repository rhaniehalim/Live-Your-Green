module.exports = function(sequelize, DataTypes) {
    var Footprint = sequelize.define("Footprint", {
      variable_name: DataTypes.STRING,
      value: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    });
    return Footprint;
  };