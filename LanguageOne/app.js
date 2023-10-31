const express = require("express");
const apiRouter = require("./routes/APIRoutes");
const bodyParser = require("body-parser");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const ejs = require("ejs");
const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || "localhost";
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use("/API", apiRouter);
app.route("/").get((req, res) => {
  res.status(200).render("api");
});

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(require("./models/Swagger"))
);

/**
 * CORS handler
 */
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Header", "*");
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    return res.status(200).json({});
  }
  next();
});

/**
 * Error handler
 * 
 */
app.use((err, req, res, next) => {
  if (err) {
    console.log(err);
    res.status(err.status || 500).json({
      error: {
        message: err.message
      }
    });
  } else {
    next();
  }
});

/**
 * Start the server
 *  */
app.listen(PORT, HOST, () => {
  console.log(`Listening at http://${HOST}:${PORT}`);
});
