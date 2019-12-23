const puppeteer = require("puppeteer");
const qs = require("./formURLs");
const excel = require("./excelToJSON");
const data = excel.data;

async function run(arr) {
  try {
    for (let i = 0; i < arr.length; i++) {
      const url = arr[i];
      const fileName =
        data[i]["Seller Name"] + "-" + (data[i]["SKU/Model"] || data[i]["SKU"]);
      const browser = await puppeteer.launch();
      const page = await browser.newPage();

      await page.setViewport({
        width: 1000,
        height: 720,
        deviceScaleFactor: 1
      });
      await page.goto(`${url}`);
      await page.screenshot({ path: `../screenshots/${fileName}.png` });
      await browser.close();
    }
  } catch (error) {
    console.error(error);
    process.exit();
  }
  process.exit();
}

run(qs.createURLFromData(data));
