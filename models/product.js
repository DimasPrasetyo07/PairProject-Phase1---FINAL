'use strict';
const {
  Model, Op
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsToMany(models.User, {
        through: 'Transactions',
        foreignKey: 'ProductId'
      })
    }
  }
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Product name is required'
        },
        notEmpty: {
          msg: 'Product name is required'
        }
      }
    },
    description: {
      type:DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Product description is required'
        },
        notEmpty: {
          msg: 'Product description is required'
        }
      }
    },
    imgSrc: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Product image is required'
        },
        notEmpty: {
          msg: 'Product photo is required'
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Product price is required'
        },
        notEmpty: {
          msg: 'Product price is required'
        },
        min: {
          args: 1,
          msg: 'Minimum price is Rp. 1'
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Product stock is required'
        },
        notEmpty: {
          msg: 'Product stock is required'
        },
        min: {
          args: 1,
          msg: 'Minimum stock is 1'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};