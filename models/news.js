const { DataTypes } = require('sequelize')
const { sequelize } = require('./index');

const News = sequelize.define('News', {
    // Здесь определяются атрибуты модели
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
      type: DataTypes.STRING,   
      allowNull: false
    },
    mini_text: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    full_text: {
        type: DataTypes.TEXT,   
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,  
        allowNull: true 
      },
    bucket: {
      type: DataTypes.STRING,  
      allowNull: true 
    },
  }, {
    timestamps: true,
    updatedAt: false
  }
)


const createTable = async () => {
  await News.sync({force: true})
}

// createTable()

module.exports = News;