const { Router } = require("express");

const {
  testController,
  getCarNames,
  getStatus,
} = require("./admin.controller");

const adminRouter = Router();

adminRouter.get("/", testController);
adminRouter.post("/cars", getCarNames);
adminRouter.get("/status", getStatus);

module.exports = adminRouter;
