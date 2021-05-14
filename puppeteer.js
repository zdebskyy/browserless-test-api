const puppeteer = require("puppeteer");

module.exports = async (url) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle2" });
  //   await page.screenshot({ path: "example.png" });

  const data = await page.evaluate(() => {
    const results = document.querySelectorAll(".item.ticket-title");

    return [...results].map((el) => el.innerText);
  });
  // console.log(data);

  //   const price = await page.evaluate(() => {
  //     const results = document.querySelectorAll(
  //       ".bold.green.size22[data-currency]"
  //     );

  //     return [...results].map((el) => el.innerText);
  //   });
  //   console.log(price);

  await browser.close();
  return data;
};
