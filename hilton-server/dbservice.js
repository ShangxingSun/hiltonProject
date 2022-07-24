// db.service.js

var dbService = {
  db: undefined,
  connect: function(callback){
    console.log(configs);
    MongoClient.connect(configs.uri, function(err, data) {
      if (err) {
        data.close();
        callback(err);
      }
      dbService.db = data.db(configs.dbName);
      console.log("Connected to database");

      // dbService.db.createCollection("reservations",function(err,res){
      //     if(err){
      //         console.log("collection create failure");
      //     }
      // });
      callback(null);
    });
  }
};

module.exports = dbService;