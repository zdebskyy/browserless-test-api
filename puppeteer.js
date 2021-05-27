const puppeteer = require("puppeteer-extra");
const { promises: fs } = require("fs");
const path = require("path");

const RecaptchaPlugin = require("puppeteer-extra-plugin-recaptcha");
puppeteer.use(
  RecaptchaPlugin({
    provider: { id: "2captcha", token: "XXXXXXX" },
    visualFeedback: true, // colorize reCAPTCHAs (violet = detected, green = solved)
  })
);

module.exports = async (url) => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox"],
    });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2" });
    // await page.type("#userEmail", "technomaster@ukr.net", { delay: 0 });
    // await page.screenshot({ path: "response.png", fullPage: true });
    // await page.solveRecaptchas();
    // await Promise.all([
    //   page.waitForNavigation(),
    //   page.click(".rc-anchor-checkbox"),
    // ]);
    // await page.click("#se_userLogin");

    // CANT PATH CAPCHA.....

    // Main search bar => outputs the search result
    await page.type("#headerSearch", "iphone 7");
    await page.click("#submit-searchmain");
    await page.waitForNavigation({ waitUntil: "networkidle2" });
    await page.screenshot({ path: "search.png", fullPage: true });
    // await page.waitForSelector(".title-cell ");

    const phoneTitle = await page.evaluate(() => {
      const names = document.querySelectorAll(
        ".title-cell ",
        ".space .rel",
        ".lheight22 .margintop5",
        ".marginright5 .link .linkWithHash .detailsLink",
        "strong"
      );
      return [...names].map((el) => el.innerText);
    });
    // console.log(phoneTitle);

    // URL to certain product

    const numTrue =
      "https://www.olx.ua/d/uk/obyavlenie/iphone-7-128-gb-ayfon-7-IDKRk2K.html?sd=1#989c47b943;promoted";
    const numFalse =
      "https://www.olx.ua/d/uk/obyavlenie/apple-iphone-7-32gb-IDL3uIn.html?sd=1#989c47b943";

    await page.goto(numTrue, { waitUntil: "networkidle2" });
    let phoneNumber;
    try {
      await page.click(".css-atkyzk-BaseStyles");
      await page.waitForTimeout(500);
      phoneNumber = await page.evaluate(() => {
        const number = document.querySelector(
          ".css-atkyzk-BaseStyles"
        ).innerText;

        return number;
      });
    } catch (error) {
      phoneNumber = "No contact";
      console.log(error);
    }

    //Taking number of views of certain product
    const dataBundle = await page.evaluate(() => {
      const view = document.querySelector(".css-1qvxqpo").innerText;
      const numberOfViews = view.split(" ");
      const author = document.querySelector(".css-owpmn2-Text").innerText;
      const title = document.querySelector(".css-1oarkq2-Text").innerText;
      const price = document.querySelector(".css-8kqr5l-Text").innerText;
      const city = document.querySelector(".css-7xdcwc-Text").innerText;
      const region = document.querySelector(
        "div > .css-xl6fe0-Text "
      ).innerText;

      return {
        author,
        title,
        price,
        views: parseInt(numberOfViews[1]),
        location: {
          city,
          region,
        },
      };
    });

    const data = { ...dataBundle, phoneNumber };
    console.log(data);

    await page.screenshot({
      path: "response1.png",
      fullPage: true,
    });

    await browser.close();
  } catch (error) {
    console.log("error :", error);
  }

  // SCREANSHOTS MADE FOR INSURE THAT IM ON THE RIGHT PLASCE
};
