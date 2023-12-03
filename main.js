const express = require("express");
const dotenv = require("dotenv");
const mainRouter = require("./src/app.routes");
const NotFoundHandler = require("./src/common/exception/not-found.handler");
const AllExceptionHandler = require("./src/common/exception/all-exception.handler");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");

dotenv.config();

async function main() {
  const app = express();
  const port = process.env.PORT;
  require("./src/config/mongoose.config");
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(mainRouter);
  app.use(morgan("dev"));
  app.use(express.static(path.join(__dirname, "..", "public")));
  NotFoundHandler(app);
  AllExceptionHandler(app);
  app.listen(port, () => {
    console.log(`Server run on: http://localhost:${port}`);
  });
}

main();
