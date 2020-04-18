const Sequelize = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();
const connection = new Sequelize(
  'fp_snm',
  'admin',
  'sosongdb1', {
  dialect: 'mysql',
  host:  'sosong-db.coyki4bwbyte.ap-southeast-1.rds.amazonaws.com',
  port: 3306
});




module.exports = {
  connection
};
