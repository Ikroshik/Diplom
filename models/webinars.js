const { DataTypes } = require('sequelize')
const { sequelize } = require('./index');

const Webinars = sequelize.define('Webinars', {
    // Здесь определяются атрибуты модели
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    year: {
        type: DataTypes.INTEGER,   
        allowNull: false
    },
    title: {
      type: DataTypes.STRING,   
      allowNull: false
    },
    date: {
      type: DataTypes.STRING,   
      allowNull: false
    },
    full_text: {
        type: DataTypes.TEXT,   
        allowNull: false
    },
  }, {
    timestamps: false,
    updatedAt: false
  }
)


const createTable = async () => {
  await Webinars.sync({force: true})
}

//- createTable()

module.exports = Webinars;