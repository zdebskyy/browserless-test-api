require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const adminRouter = require("./adminApi/admin.router");

const port = process.env.PORT || 3001;

module.exports = class Server {
  constructor() {
    this.server = null;
  }

  async start() {
    // Input start middlwares here
    this.initPort();
    this.initServer();
    this.initMiddlwares();
    this.initRoutes();
    // this.errorHandling();
    this.startListening();
  }

  initServer() {
    this.server = express();
    console.log("server initialized");
  }

  initPort() {
    this.port = port;
    console.log("port initialized");
  }

  initMiddlwares() {
    this.server.use(express.json());
    this.server.use(morgan("dev"));
    this.server.use(cors());
    console.log("middlewares initialized");
  }

  //   errorHandling() {
  //     let status = 500;
  //     this.server.use((error, req, res, next) => {
  //       if (error instanceof NotFoundError ) {
  //         status = error.status;
  //       }

  //       return res.status(status).send({ message: error.message });
  //     });
  //   }

  initRoutes() {
    // input routers here
    this.server.use("/api/admin", adminRouter);
    console.log("routes initialized");
  }

  startListening() {
    this.server.listen(this.port, () => {
      console.log("Server started at PORT:", this.port);
    });
  }
};
