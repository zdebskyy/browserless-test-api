const { Router } = require("express");

const { testController, search, getStatus } = require("./admin.controller");

const adminRouter = Router();

adminRouter.get("/", testController);
adminRouter.get("/search-result", search);
adminRouter.get("/status", getStatus);

module.exports = adminRouter;
