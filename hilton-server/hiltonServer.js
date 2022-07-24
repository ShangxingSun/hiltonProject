
const express = require('express');
const app = express();
const port = 3000;

const MongoClient =  require('mongodb').MongoClient;
var  ObjectId =  require('mongodb').ObjectId;
const configs = require('./configs.json');


const cors = require('cors');
const bodyParser = require('body-parser');
app.use(cors({
    origin: '*'
}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

async function getReservationDatFromMongo(db){
   let cursor = db.collection("reservations").find({});
   let result = [];
   await cursor.forEach((item)=>{
       console.log(item);
       result.push({
        id: item._id,
        guest_name: item.guest_name,
        arrival_time : item.arrival_time,
        guest_contact: item.guest_contact,
        table_size: item.table_size,
        status: item.status
    });
   })
   return result;

}
function insertReservationDataFromMongo(body,db){
    console.log(body);
    let reservation = {
        guest_name: body.guest_name,
        arrival_time : body.arrival_time,
        guest_contact: body.guest_contact,
        table_size: body.table_size,
        status: "open"
    }
    db.collection("reservations").insertOne(reservation,(err,res)=>{
        if(err){
            console.log("error: ", error);
        }else{
            console.log("1 reservation added")
        }
    });
}

function updateReservationDataFromMongo(body,reservationID,db){
    console.log(body,reservationID);
    let reservation = {
        $set:{guest_name: body.guest_name,
        arrival_time : body.arrival_time,
        guest_contact: body.guest_contact,
        table_size: body.table_size,
        status: body.status}
    }
    db.collection("reservations").updateOne({_id:ObjectId(reservationID)},reservation,(err,res)=>{
        if(err){
            console.log("error: ", error);
        }else{
            console.log("1 reservation updated")
        }
    });
}

MongoClient.connect(configs.uri, function(err, data) {
    if (err) {
      data.close();
      console.log("error: ", err);
    }
    let db = data.db(configs.dbName);
    console.log("Connected to database");


    app.get('/reservations', async function(req, res){
        let info = await getReservationDatFromMongo(db);
        res.send(info);
    })

    app.get('/', (req, res) => {
        res.sendStatus(404);
    })
    
    app.post('/reservation',(req,res)=>{
        insertReservationDataFromMongo(req.body,db);
        res.sendStatus(200);
    });
    
    app.put('/reservation/:id',(req,res)=>{
        let reservationID = req.params.id;
        updateReservationDataFromMongo(req.body,reservationID,db);
        res.sendStatus(200);
    });
      
    app.listen(port, () => {
        console.log(`listening on port ${port}`)
    })
});


