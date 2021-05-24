// Import express
let express = require('express');
// Import Body parser
let bodyParser = require('body-parser');
// Import Mongoose
let mongoose = require('mongoose');


// Initialize the app
let app = express();

// Import routes
let apiRoutes = require("./api-routes");
// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));

// Connect to Mongoose and set connection variable
mongoose.connect('mongodb+srv://tryDb:080tryDb@trycluster-d1pr6.mongodb.net/sample?retryWrites=true&w=majority', { useNewUrlParser: true,useUnifiedTopology: true})
    .catch(err=>console.log(err));

var db = mongoose.connection;

// Added check for DB connection

if(!db)
    console.log("Error connecting db")
else
    console.log("Running at PORT: "+  process.env.PORT)
    console.log("Db connected successfully")

app.use(bodyParser.json());

// Send message for default URL
app.get('/', (req, res) =>

 res.send("ACCESS API USING THIS URL <br>"+req.protocol+"://"+ req.hostname+"/api/{endpointname}"+
 "<br>"+"or"+"<br>https://sample-1.nicoagb.repl.co/api/{endpointname}"
 )
 
 );




var port = process.env.PORT || 8090;
// Use Api routes in the App
app.use('/api', apiRoutes);
// Launch app to listen to specified port
app.listen(port, function () {
    console.log("Running... " );
});