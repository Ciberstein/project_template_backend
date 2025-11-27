require("dotenv").config();
const { server } = require("./app");
const { db } = require("./database/config");
const init = require("./models/init.models");

// SEEDERS
const { app_config_categories_seeder, app_config_seeder } = require("./seeders/app.seeders");


const PORT = process.env.PORT || 3010;

db.authenticate()
  .then(() => console.log(
    "\x1b[34mDATABASE AUTH STATUS:\x1b[0m",
    "\x1b[32mAUTHENTICATED\x1b[0m"
  ))
  .catch((err) => console.log(err));

init();

db.sync({ force: false })
  .then(async () => {
    console.log("\x1b[34mDATABASE STATUS:\x1b[0m", "\x1b[32mSYNC\x1b[0m");

    // Seeders
    await app_config_categories_seeder();
    await app_config_seeder();

  })
  .catch((err) => console.log(err));

server.listen(PORT, () => {
  console.log(
    "\x1b[34mSERVER IS RUNNING ON PORT:\x1b[0m",
    `\x1b[32m${PORT}\x1b[0m`
  );
});
