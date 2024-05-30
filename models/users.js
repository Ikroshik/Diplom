const { DataTypes } = require('sequelize')
const { sequelize } = require('./index');

const Users = sequelize.define('Users', {
    // Здесь определяются атрибуты модели
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    login: {
      type: DataTypes.STRING,   
      allowNull: false
    },
    encryptedPassword: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    role: {
        type: DataTypes.ENUM,   
        values: ['admin', 'restricted'],
        allowNull: false
    },
  }, {
    timestamps: false,
    updatedAt: false
  }
)


const createTable = async () => {
  await Users.sync({force: true})
}

// createTable()

module.exports = Users;