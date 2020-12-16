'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class movies extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  movies.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    movie_id: {
      allowNull:false,
      type:DataTypes.STRING
    },
    movie_name: {
      allowNull:false,
      type:DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'movies',
  });
  return movies;
};