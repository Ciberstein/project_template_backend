const Accounts = require("./accounts.models");
const App = require("./app.models");
const Auth = require("./auth.models");


const init = () => {

  /* APP RELATIONSHIPS */

  App.Config.belongsTo(App.Category, {
    foreignKey: 'categoryId',
    as: 'category'
  });
  App.Category.hasMany(App.Config, {
    foreignKey: 'categoryId',
    as: 'items'
  });

  /* END APP RELATIONSHIPS */

  /* ACCOUNTS RELATIONSHIPS */  

  Accounts.Account.hasMany(Auth.Codes, {
    onDelete: 'CASCADE',
    foreignKey: 'accountId',
    as: 'codes',
  });
  Auth.Codes.belongsTo(Accounts.Account, {
    foreignKey: 'accountId',
    as: 'account',
  });

  /* END ACCOUNTS RELATIONSHIPS */  
}

module.exports = init;