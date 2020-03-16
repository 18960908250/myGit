const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:10086";
MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
  if (err) throw err;
  console.log('数据库已创建');
  const dbase = db.db("IZAYAData");
  dbase.createCollection('site', function (err, res) {
    if (err) throw err;
    console.log("创建集合!");
    db.close();
  });
});

function add() {
  return new Promise((resolve, reject) => {

  })
}
function detele() {
  return new Promise((resolve, reject) => {

  })
}
function update() {
  return new Promise((resolve, reject) => {

  })
}
function query({ queryOpt = {},dbName = 'IZAYAData', collectionName = 'site' }) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
      if (err) throw err
      var dbo = db.db(dbName);
      dbo.collection(collectionName). find(queryOpt).toArray(function(err, result) { // 返回集合中所有数据
        if (err) throw err;
        const respones = {
          status: 0,
          data: result,
          message: 'ok'
        }
        res.json(respones)
        db.close();
      });
    });
  })
}

module.exports = {
  add,
  detele,
  update,
  query
}