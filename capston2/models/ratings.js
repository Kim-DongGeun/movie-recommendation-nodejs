'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ratings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  ratings.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    user_id: {
      allowNull: false,
      type:DataTypes.INTEGER,
    },
    movie_id:{
      allowNull: false,
      type:DataTypes.INTEGER,
    },
    rating: {
      allowNull: false,
      type:DataTypes.FLOAT,
    },
  }, {
    sequelize,
    modelName: 'ratings',
  });
  return ratings;
};