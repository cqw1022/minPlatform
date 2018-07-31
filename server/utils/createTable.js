// const tools = require("./tools");
import { query } from "./sqlTools";
console.log(query);
const createTable = function(sql) {
  return query(sql, []);
};
const users = `create table if not exists users(
 id INT NOT NULL AUTO_INCREMENT,
 name VARCHAR(100) NOT NULL,
 pass VARCHAR(40) NOT NULL,
 PRIMARY KEY ( id )
);`;
createTable(users);
export default {};
