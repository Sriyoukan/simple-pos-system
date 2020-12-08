var app = require("express")();
var server = require("http").Server(app);
var bodyParser = require("body-parser");
const { resolveSoa } = require("dns");
var moment = require("moment")
var Datastore = require("nedb");

app.use(bodyParser.json());

module.exports = app;



var User = new Datastore({
    filename: "./server/databases/user.db",
    autoload: true
  });


app.post("/newUser", function(req, res) {
    var newUser = req.body;
    
    User.insert(newUser, function(err, data) {
      if (err) res.status(500).send(err);
      else {
        
        res.sendStatus(200);
        
      }
    });
  });
app.post('/login',(req,res)=>{
    User.findOne({username:req.body.username},(err,data)=>{
        if(err|| data==null){
            return res.status(500).send(err);
        }else{
            console.log(data)
            if(data.password==req.body.password){
                res.json(data)
             }else{
                res.status(500).send(err)
            }
        }
    })
})