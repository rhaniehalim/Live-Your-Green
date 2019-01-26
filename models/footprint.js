module.exports = function(sequelize, DataTypes) {
    var Footprint = sequelize.define("Footprint", {
      household_members: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      home_size: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      food_choice: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      food_source: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      waterTotal: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      purchases: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      waste: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      recycle: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      personal_vehicle: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      public_transportation: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      air_travel: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      totalFootprint: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
    });
    return Footprint;
  };