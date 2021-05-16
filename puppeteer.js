const puppeteer = require("puppeteer");
const { promises: fs } = require("fs");
const path = require("path");

module.exports = async (url) => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox"],
    });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2" });
    //   await page.screenshot({ path: "example.png" });

    const data = await page.evaluate(() => {
      const results = document.querySelectorAll(".item.ticket-title");

      return [...results].map((el) => el.innerText);
    });
    // console.log(data);

    const price = await page.evaluate(() => {
      const results = document.querySelectorAll(
        ".bold.green.size22[data-currency]"
      );

      return [...results].map((el) => el.innerText);
    });
    // console.log(price);

    const carData = data.map((el, index) => {
      return {
        name: el,
        price: price[index],
      };
    });
    // console.log(carData);
    const pathToData = path.join("temp", "car.txt");

    const merc = path.join(__dirname, "temp", "mercedes", "merc.txt");

    // await fs.writeFile(merc, JSON.stringify(carData), "utf8");

    const content = await fs.readFile(merc, "utf8");
    console.log(JSON.parse(content));

    await browser.close();
    return carData;
  } catch (error) {
    console.log("error :", error);
  }
};
