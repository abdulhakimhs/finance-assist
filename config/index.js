require("dotenv").config();

module.exports = {
  port: process.env.PORT,
  database:{
    user: process.env.DBUSER,
    pass: process.env.DBPASS,
    name: process.env.DBNAME,
  }
};
