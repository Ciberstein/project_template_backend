const { DataTypes } = require("sequelize");
const { db } = require("../database/config");

const Account = db.define(
  "accounts",
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      type: DataTypes.INTEGER,
      field: "id",
    },
    authority: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: -1,
      field: "authority",
    },
    lang: {
      type: DataTypes.ENUM("es", "en"),
      allowNull: false,
      defaultValue: "es",
      field: "lang",
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      field: "username",
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "email",
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "password",
    },
    ip: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "ip",
    },
  },
  {
    tableName: "accounts",
    schema: "accounts",
  }
);

const Accounts = {
  Account,
};

module.exports = Accounts;