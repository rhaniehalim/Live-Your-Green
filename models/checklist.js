module.exports = function(sequelize, DataTypes) {
    var Checklist = sequelize.define("Checklist", {
      text: DataTypes.STRING,
      complete: DataTypes.BOOLEAN
    });
    return Checklist;
  };