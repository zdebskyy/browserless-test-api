const fetchProducts = require("../puppeteer");

class AdminController {
  async testController(req, res) {
    res.status(200).json({ message: "Everything is working" });
  }
  async getStatus(req, res) {
    res
      .status(200)
      .json({ cpu: "50%", memory: "73%", freeSlots: "20", log: "Error" });
  }
  async getCarNames(req, res) {
    const { url } = req.body;
    const data = await fetchProducts(url);
    console.log(data);
    res.status(200).json(data);
  }
}

module.exports = new AdminController();
