
const api = {
  '/query': {
    method: 'post',
    callback(req, res) {
      MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
        console.log(err)
        if (err) throw err;
        var dbo = db.db("IZAYAData");
        dbo.collection("site"). find({}).toArray(function(err, result) { // 返回集合中所有数据
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
    }
  },
  '/add': {
    method: 'post',
    callback(reqest, response) {
      MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
        console.log(err)
        if (err) throw err;
        var dbo = db.db("IZAYAData");
        console.log(reqest.body)
        dbo.collection("site").insertOne(reqest.body, function(err, res) {
          if (err) throw err;
          const respones = {
            status: 0,
            data: {},
            message: 'ok'
          }
          response.json(respones)
          db.close();
        });
      });
    }
  }
}
module.exports = api