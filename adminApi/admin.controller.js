const fetchProducts = require("../puppeteer");
const serverData = require("../cpuUtil");

class AdminController {
  async testController(req, res) {
    res.status(200).json({ message: "Everything is working" });
  }
  async getStatus(req, res) {
    const data = await serverData();

    res.status(200).json(data);
  }
  async getCarNames(req, res) {
    const { url } = req.body;
    const data = await fetchProducts(url);
    console.log(data);
    res.status(200).json(data);
  }
}

module.exports = new AdminController();
