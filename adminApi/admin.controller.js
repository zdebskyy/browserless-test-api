const fetchProducts = require("../puppeteer");
const serverData = require("../cpuUtil");
const path = require("path");
const { promises: fs } = require("fs");

const url = "https://www.olx.ua/uk/";

class AdminController {
  async testController(req, res) {
    res.status(200).json({ message: "Everything is working" });
  }
  async getStatus(req, res) {
    const data = await serverData();

    res.status(200).json(data);
  }
  async search(req, res) {
    const data = await fetchProducts(url);

    res.status(200).json("OK");
  }
}

module.exports = new AdminController();
