const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const moment = require("moment");
const schedule = require("node-schedule");
const request = require("request");
dotenv.config({ path: "./util/config.env" });

const localServer = process.env.localServer;
const port = process.env.PORT || 5000;


const app = express();
app.options("*", cors());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
// handle requests here...
app.use("/", express.static(__dirname + "/"));
app.use(bodyParser.json());
app.use(cors());

mongoose.Promise = global.Promise;
moment.suppressDeprecationWarnings = true;
mongoose.set("strictQuery", true);

let serverRoute = process.env.serverAddress;
let clientRoute = process.env.clientAddress;


dbConfig = {
    url: "mongodb://localhost/DemoBackend",
};
// Connecting to the database
mongoose
.connect(dbConfig.url, {
    useNewUrlParser: true,
    //to remove deprecation message
    useUnifiedTopology: true,
})
.then(() => {
    console.log("Successfully connected to the database");
})
.catch((err) => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
});

// Examples
app.get("/testGet", async (req, res) => {
    console.log("Tested Get");
    res.json({ status: "working" });
});

app.post("/testPost", async (req, res) => {
    console.log("request body");
    console.log(req.body);
    res.json(req.body);
});

// schedule.scheduleJob("* * * * *", async function () {
//     console.log("schedule job");
// });


//Controller Imports
const clientVisitor = require("./controllers/clientVisitor.controller");
const empVisitor = require("./controllers/empVisitor.controller");
const escort = require("./controllers/escort.controller");
const security = require("./controllers/security.controller");
const twilio = require("./controllers/twilio.controller");
const bank = require("./controllers/bank.controller");

//Route Imports
require("./routes/clientVisitor.route.js")(app);
require("./routes/empVisitor.route.js")(app);
require("./routes/escort.route.js")(app);
require("./routes/security.route.js")(app);
require("./routes/twilio.route.js")(app);
require("./routes/bank.route.js")(app);

app.set("view engine", "ejs");


app.get("/visitorPass/:reqID", async (req,res) => {
    console.log(serverRoute);
    let options = {
        url: serverRoute + "/clientVisitor/" + req.params.reqID,
        method: "get",
        json: true
    };
    request(options, (err, response, body) => {
        console.log(body)
        if (body.success) {
            res.render("visPass", {
                data : body
            });
        }
    });
})

app.listen(port, () => console.log("Server @ port", port));