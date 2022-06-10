const express = require("express");
const connection = require("./models");
const bodyParser = require("body-parser");
const path = require("path");
const dotenv = require("dotenv");
const ExpressHandlebars  = require("express-handlebars");
dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept, Authorization, x-api-key"
	);
	res.header("Access-Control-Allow-Credentials", true);
	res.header("Content-Type", "application/json");
	next();
});

app.use((req, res, next) => {
	bodyParser.json()(req, res, (err) => {
		if (err) {
			return res.status(400).json({
				errors: [
					{
						status: 0,
						response: "error",
						msg: "Bad API Request. Please check request format!",
					},
				],
			});
		}

		next();
	});
});

// parse application json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// Home route
app.get('/', (req, res)=> {
    res.sendFile("default.html", { root: __dirname });
})

require("./routes.js")(app);

// set port, listen for requests
app.listen(port, () => {
	console.log("Node server is running " + port);
});
