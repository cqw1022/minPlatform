import { query } from "../utils/sqlTools";
let insertData = function(value) {
  let _sql = "insert into users(name,pass) values(?,?);";
  return query(_sql, value);
};
